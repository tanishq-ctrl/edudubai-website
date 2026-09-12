-- 0004_courses_leads_carf.sql
--
-- Adds the three tables the admin panel needs, plus a combined activity view.
--
--   courses           - the course catalogue, moving out of src/lib/courses.ts
--                       so the admin panel can edit what the public site shows
--   leads             - contact / corporate / brochure / course-application
--                       submissions, which are currently fire-and-forget to
--                       Systeme.io and stored nowhere we own
--   carf_submissions  - CARF diagnostic results, kept separate from leads
--                       because score and risk level have no analogue on a
--                       contact form
--   admin_activity    - a view unioning every inbound activity so the admin
--                       feed is one query rather than six
--
-- This migration contains NO grants. Table and column privileges live in
-- 0005_new_table_privileges.sql, which must be applied straight after or the
-- public site will not be able to read courses.
--
-- Idempotent: safe to run more than once.

begin;

-- ---------------------------------------------------------------------------
-- courses
--
-- Scalars are columns; the nested content from the TypeScript Course type is
-- jsonb. Splitting outcomes/faq/schedules into child tables would mean joins
-- and a much larger editor for no practical gain -- these are always read and
-- written as whole documents alongside their course.
-- ---------------------------------------------------------------------------
create table if not exists public.courses (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique,
  title               text not null,
  short_description   text not null,
  long_description    text not null,
  category            text not null,
  issuing_body        text not null,
  level               text not null,
  duration_hours      integer not null,
  price_usd           numeric(10,2) not null,
  currency            text not null default 'USD',
  delivery_modes      text[] not null default '{}',

  featured            boolean not null default false,
  published           boolean not null default true,
  display_order       integer not null default 0,

  image_url           text,
  hero_image_url      text,

  -- Nested content. Defaults keep every consumer free of null checks.
  delivery_schedules  jsonb not null default '[]'::jsonb,
  outcomes            jsonb not null default '[]'::jsonb,
  who_its_for         jsonb not null default '[]'::jsonb,
  faq                 jsonb not null default '[]'::jsonb,
  audience_categories jsonb not null default '[]'::jsonb,
  why_choose_us       jsonb,
  exam_info           jsonb,
  program_overview    jsonb,

  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),

  constraint courses_level_check
    check (level in ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')),
  constraint courses_issuing_body_check
    check (issuing_body in ('ACAMS', 'GCI', 'HOCK_INTERNATIONAL')),
  constraint courses_duration_check check (duration_hours > 0),
  constraint courses_price_check check (price_usd >= 0),
  constraint courses_slug_format_check check (slug ~ '^[a-z0-9-]+$')
);

create index if not exists courses_published_order_idx
  on public.courses (published, display_order);
create index if not exists courses_featured_idx
  on public.courses (featured) where featured;
create index if not exists courses_category_idx
  on public.courses (category);

-- Keep updated_at honest regardless of what the writer remembers to send.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
  before update on public.courses
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- leads
--
-- One table for every inbound enquiry form, distinguished by `source`. The
-- shapes differ only slightly, and the admin feed wants them in one list.
--   contact             -> message
--   corporate           -> message (training need) + preferred_delivery
--   brochure            -> course_slug
--   course_application  -> course_slug + course_title
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),

  source             text not null,
  name               text not null,
  email              text not null,
  phone              text,
  company            text,

  course_slug        text,
  course_title       text,
  message            text,
  preferred_delivery text,

  status             text not null default 'NEW',
  notes              text,

  -- Systeme.io sync outcome. Recorded so a CRM outage or plan downgrade never
  -- loses the lead: this table is the system of record, the CRM is a mirror.
  crm_synced         boolean not null default false,
  crm_contact_id     text,

  metadata           jsonb not null default '{}'::jsonb,

  constraint leads_source_check check (source in (
    'CONTACT', 'CORPORATE', 'BROCHURE', 'COURSE_APPLICATION', 'GENERAL'
  )),
  constraint leads_status_check check (status in (
    'NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'
  )),
  constraint leads_preferred_delivery_check check (
    preferred_delivery is null
    or preferred_delivery in ('IN_PERSON', 'LIVE_VIRTUAL', 'HYBRID')
  )
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (lower(email));

-- ---------------------------------------------------------------------------
-- carf_submissions
--
-- Kept separate from leads: score and risk_level have no meaning on a contact
-- form, and answers is a full diagnostic payload. admin_activity unions the
-- two for display.
-- ---------------------------------------------------------------------------
create table if not exists public.carf_submissions (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),

  name           text not null,
  email          text not null,
  company        text not null,

  score          integer,
  risk_level     text,
  answers        jsonb not null default '{}'::jsonb,

  crm_synced     boolean not null default false,
  crm_contact_id text,

  constraint carf_score_check check (score is null or (score >= 0 and score <= 100))
);

create index if not exists carf_submissions_created_at_idx
  on public.carf_submissions (created_at desc);
create index if not exists carf_submissions_email_idx
  on public.carf_submissions (lower(email));

-- ---------------------------------------------------------------------------
-- Row Level Security
--
-- courses: the catalogue is public by nature, so anon may read PUBLISHED rows.
--          This is the only table in the database anon can read anything from.
--          Writes are service-role only (service_role has BYPASSRLS).
-- leads / carf_submissions: no policies at all. RLS enabled with zero policies
--          denies every client role outright; only the service role gets in.
--          This is the same shape trainer_applications already uses.
-- ---------------------------------------------------------------------------
alter table public.courses          enable row level security;
alter table public.leads            enable row level security;
alter table public.carf_submissions enable row level security;

drop policy if exists "Published courses are publicly readable" on public.courses;
create policy "Published courses are publicly readable"
  on public.courses for select
  using (published = true);

-- ---------------------------------------------------------------------------
-- admin_activity
--
-- security_invoker = true is important: without it the view would run with the
-- owner's privileges and could leak every lead and enrollment to any role that
-- could select from it. With it, the caller's own RLS applies, so only the
-- service role (BYPASSRLS) sees everything -- which is what the admin panel
-- uses, after getCurrentAdmin() has passed.
-- ---------------------------------------------------------------------------
drop view if exists public.admin_activity;
create view public.admin_activity
with (security_invoker = true)
as
  select
    'LEAD'::text               as kind,
    l.id::text                 as id,
    l.created_at               as occurred_at,
    l.name                     as person_name,
    l.email                    as person_email,
    coalesce(l.course_title, l.company, l.source) as summary,
    l.status                   as status
  from public.leads l

  union all
  select
    'CARF', c.id::text, c.created_at, c.name, c.email,
    c.company || coalesce(' - ' || c.risk_level, ''), 'NEW'
  from public.carf_submissions c

  union all
  select
    'TRAINER', t.id::text, t.created_at, t.full_name, t.email,
    t.country, t.status
  from public.trainer_applications t

  union all
  select
    'SUPPORT', s.id::text, s.created_at, null, null,
    s.subject, s.status
  from public.support_requests s

  union all
  select
    'ENROLLMENT', e.id::text, e.created_at, null, null,
    e.course_title, e.status
  from public.enrollments e

  union all
  select
    'SCHOLARSHIP', a.id::text, a."createdAt" at time zone 'UTC',
    a."fullName", a.email, a.organization, a.status::text
  from public.scholarship_applications a;

commit;

-- ---------------------------------------------------------------------------
-- Storage bucket for course images. Public read (served through
-- /storage/v1/object/public/...), writes service-role only via an admin-gated
-- upload route -- the same pattern as trainer CV uploads.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('course-images', 'course-images', true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Verification
-- ---------------------------------------------------------------------------
select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('courses', 'leads', 'carf_submissions', 'admin_activity')
order by 1;

select c.relname as tbl, c.relrowsecurity as rls,
       (select count(*) from pg_policy p where p.polrelid = c.oid) as policies
from pg_class c
where c.oid in ('public.courses'::regclass,
                'public.leads'::regclass,
                'public.carf_submissions'::regclass);

select id, public from storage.buckets where id = 'course-images';

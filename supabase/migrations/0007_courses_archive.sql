-- 0007_courses_archive.sql
--
-- Adds soft-delete to courses.
--
-- A course row carries a lot of irreplaceable nested content (schedules,
-- outcomes, FAQ, exam info, audience categories). This project is on the
-- Supabase free tier with no automated backups, so a hard DELETE from the
-- admin panel would be unrecoverable. Archiving is reversible; deleting is not.
--
-- archived_at doubles as the flag and the audit trail: null means active, a
-- timestamp means archived and records when.
--
-- The public RLS policy is tightened to exclude archived rows, so archiving is
-- enforced by the database rather than relying on every query remembering to
-- filter. Archived rows stay invisible to anon even if published is somehow
-- left true.
--
-- Idempotent: safe to run more than once.

begin;

alter table public.courses
  add column if not exists archived_at timestamptz;

-- Partial index: the admin list filters on active rows constantly, archived
-- rows are read rarely.
create index if not exists courses_active_idx
  on public.courses (display_order) where archived_at is null;

-- Replace the 0004 policy so archived courses are never publicly readable.
drop policy if exists "Published courses are publicly readable" on public.courses;
create policy "Published courses are publicly readable"
  on public.courses for select
  using (published = true and archived_at is null);

commit;

-- Verification: expect the policy to mention archived_at, and every existing
-- course to be active.
select policyname, qual
from pg_policies
where schemaname = 'public' and tablename = 'courses';

select count(*) filter (where archived_at is null) as active,
       count(*) filter (where archived_at is not null) as archived
from public.courses;

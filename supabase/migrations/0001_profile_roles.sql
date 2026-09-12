-- 0001_profile_roles.sql
--
-- Adds role-based access control to public.profiles and grants the first admin.
--
-- BACKGROUND
-- There is no `users` table in this database; prisma/schema.prisma describes
-- tables that were never created. Users are auth.users joined to
-- public.profiles on id. Email lives only in auth.users.
--
-- SECURITY
-- src/app/dashboard/profile/page.tsx upserts public.profiles directly from the
-- browser. A plain role column on a client-writable table is a privilege
-- escalation hole: any signed-in user could POST role='ADMIN'. The
-- column-level REVOKEs below are what prevent that, and they are enforced by
-- Postgres itself rather than by application code.
--
-- Idempotent: safe to run more than once.

begin;

-- 1. The role column.
alter table public.profiles
  add column if not exists role text not null default 'STUDENT';

-- 2. Restrict it to known values.
alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('STUDENT', 'INSTRUCTOR', 'ADMIN'));

-- 3. Clients may never write their own role.
--    NOTE: a later `grant update on public.profiles to authenticated` would
--    re-grant every column and reopen this hole. Re-run these revokes after
--    any table-wide grant.
revoke update (role) on public.profiles from authenticated, anon;
revoke insert (role) on public.profiles from authenticated, anon;

-- 4. Index for admin lookups by role.
create index if not exists profiles_role_idx on public.profiles (role);

commit;

-- 5. Grant the first admin. Runs as table owner, so the revokes above do not
--    apply here. Change the email if a different account should be admin.
update public.profiles p
set role = 'ADMIN', updated_at = now()
from auth.users u
where u.id = p.id
  and u.email = 'training@edudubai.org';

-- 6. Verification — expect exactly one row with role = ADMIN.
select p.id, u.email, p.role
from public.profiles p
join auth.users u on u.id = p.id
where u.email = 'training@edudubai.org';

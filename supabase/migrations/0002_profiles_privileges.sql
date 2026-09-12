-- 0002_profiles_privileges.sql
--
-- Replaces the table-wide grants on public.profiles with precise column-level
-- privileges. MUST be applied: 0001 added a `role` column but its
-- column-level REVOKEs had no effect, so the escalation hole it warned about
-- is currently OPEN.
--
-- WHY 0001's REVOKES DID NOTHING
-- anon and authenticated hold TABLE-level grants (relacl: anon=awdDxtm,
-- authenticated=awdDxtm). PostgreSQL does not let a column-level REVOKE carve
-- an exception out of a table-level privilege: the table grant keeps covering
-- every column, including ones added later. The fix is to drop the
-- table-level grants and re-grant only the columns clients may touch.
--
-- THREE PROBLEMS FIXED
-- 1. `role` is writable by any signed-in user (privilege escalation). The
--    "Users can update own profile" policy has no WITH CHECK, so a user can
--    update any column of their own row, role included.
-- 2. anon and authenticated hold DELETE and TRUNCATE. TRUNCATE is NOT subject
--    to row level security, so that grant allows wiping every profile row.
-- 3. Neither role has SELECT at all, so profile reads have been failing
--    silently (src/app/dashboard/page.tsx swallows the error and falls back to
--    the email prefix) and role-based admin checks could never work.
--
-- Column lists are derived from actual application usage:
--   read   - dashboard/page.tsx and dashboard/profile/page.tsx select("*"),
--            auth-guards.ts selects id, full_name, role
--   insert - auth/callback/route.ts inserts (id, full_name); profile editor
--            upserts (id, full_name, phone, country, updated_at)
--   update - the update half of that same upsert
--
-- Idempotent: safe to run more than once.

begin;

-- Clean slate. Nothing anonymous should reach this table at all.
revoke all on public.profiles from anon;
revoke all on public.profiles from authenticated;

-- Read: every column, including role. Row Level Security still restricts a
-- user to their own row, so this exposes nothing new.
grant select (id, full_name, phone, country, created_at, updated_at, role)
  on public.profiles to authenticated;

-- Create: the signup/callback path. `role` is deliberately absent, so new
-- rows always take the STUDENT default.
grant insert (id, full_name, phone, country, created_at, updated_at)
  on public.profiles to authenticated;

-- Modify: the profile editor only. `id` and `role` are deliberately absent.
grant update (full_name, phone, country, updated_at)
  on public.profiles to authenticated;

-- Deliberately NOT granted to anon or authenticated:
--   DELETE, TRUNCATE, REFERENCES, TRIGGER
--   INSERT/UPDATE on role  -> only the service role may change a role
--
-- service_role keeps full access and is unaffected by the revokes above.

commit;

-- Verification 1 - expect anon absent entirely, and authenticated holding
-- SELECT on role but NOT INSERT or UPDATE.
select grantee, privilege_type
from information_schema.column_privileges
where table_schema = 'public'
  and table_name = 'profiles'
  and column_name = 'role'
  and grantee in ('anon', 'authenticated')
order by grantee, privilege_type;

-- Verification 2 - expect no 'd' (DELETE) and no 'D' (TRUNCATE) for anon or
-- authenticated.
select relacl from pg_class where oid = 'public.profiles'::regclass;

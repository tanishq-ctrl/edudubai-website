-- 0005_new_table_privileges.sql
--
-- Locks down the objects created in 0004, and stops future tables being born
-- wide open.
--
-- ROOT CAUSE OF EVERY PRIVILEGE PROBLEM IN THIS DATABASE
-- Supabase ships ALTER DEFAULT PRIVILEGES for schema public that grants
-- arwdDxtm (ALL: insert, select, update, delete, truncate, references,
-- trigger, maintain) to anon and authenticated on every newly created table:
--
--   pg_default_acl: postgres/public/r ->
--     {anon=arwdDxtm/postgres, authenticated=arwdDxtm/postgres, ...}
--
-- So every table starts fully writable by anonymous visitors, and Row Level
-- Security is the only thing standing in the way. That is not enough on its
-- own: TRUNCATE is NOT subject to RLS, so anon holding TRUNCATE can empty any
-- table regardless of policy. This is what 0002 and 0003 had to clean up on
-- the six original tables, and 0004's tables inherited exactly the same
-- problem.
--
-- WHAT 0004 GOT RIGHT ALREADY
-- leads and carf_submissions have RLS enabled with zero policies, which denies
-- select/insert/update/delete to every client role. admin_activity is declared
-- security_invoker, so it applies the caller's own RLS rather than the view
-- owner's and cannot leak. Those defences held -- but the grants still need
-- removing, TRUNCATE above all.
--
-- Idempotent: safe to run more than once.

begin;

-- ---------------------------------------------------------------------------
-- Clean slate on everything 0004 created.
-- ---------------------------------------------------------------------------
revoke all on public.courses          from anon, authenticated;
revoke all on public.leads            from anon, authenticated;
revoke all on public.carf_submissions from anon, authenticated;
revoke all on public.admin_activity   from anon, authenticated;

-- ---------------------------------------------------------------------------
-- courses is the one genuinely public table: the catalogue is meant to be read
-- by anonymous visitors. The RLS policy from 0004 still restricts that to rows
-- where published = true, so unpublished drafts stay invisible.
--
-- Read only. All writes go through the admin panel on the service role.
-- ---------------------------------------------------------------------------
grant select on public.courses to anon, authenticated;

-- leads, carf_submissions and admin_activity get nothing. They are service
-- role only, in both directions:
--   * form submissions are written server-side by an admin/service client,
--     never by the browser
--   * the admin feed reads them after getCurrentAdmin() has passed
--
-- service_role retains ALL on every object above via the default privileges
-- and is unaffected by these revokes.

commit;

-- ---------------------------------------------------------------------------
-- Stop the bleeding at the source.
--
-- Without this, the next table anyone adds -- via a migration, psql, or the
-- Supabase dashboard -- is again created with ALL granted to anon and
-- authenticated, and the only thing preventing anonymous TRUNCATE is somebody
-- remembering to write another migration like this one.
--
-- BEHAVIOUR CHANGE, PLEASE READ
-- After this runs, a newly created table in schema public is readable and
-- writable by NOBODY except the service role until you explicitly grant
-- access. If you add a table through the dashboard and PostgREST answers
-- "permission denied", that is this change, working as intended. Grant what
-- the table actually needs, e.g.:
--
--   grant select on public.new_table to anon, authenticated;
--
-- To revert to Supabase's default behaviour:
--
--   alter default privileges for role postgres in schema public
--     grant all on tables to anon, authenticated;
--
-- Note this only covers objects created by the `postgres` role. Supabase's
-- internal `supabase_admin` role has its own default privileges that cannot be
-- altered from here, so tables created by platform tooling may still arrive
-- pre-granted. Verify new tables rather than assuming.
-- ---------------------------------------------------------------------------
alter default privileges for role postgres in schema public
  revoke all on tables from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Verification
--
-- Expect:
--   courses          -> anon/auth SELECT true, everything else false
--   leads            -> all false
--   carf_submissions -> all false
--   admin_activity   -> all false
-- ---------------------------------------------------------------------------
select c.relname as obj,
       has_table_privilege('anon',          c.oid, 'SELECT')   as anon_select,
       has_table_privilege('anon',          c.oid, 'TRUNCATE') as anon_truncate,
       has_table_privilege('authenticated', c.oid, 'SELECT')   as auth_select,
       has_table_privilege('authenticated', c.oid, 'INSERT')   as auth_insert,
       has_table_privilege('authenticated', c.oid, 'TRUNCATE') as auth_truncate,
       has_table_privilege('service_role',  c.oid, 'SELECT')   as svc_select
from pg_class c
where c.oid in ('public.courses'::regclass,
                'public.leads'::regclass,
                'public.carf_submissions'::regclass,
                'public.admin_activity'::regclass)
order by 1;

-- Expect anon and authenticated to be absent from the default ACL for tables.
select d.defaclacl::text as default_acl_for_new_tables
from pg_default_acl d
join pg_namespace n on n.oid = d.defaclnamespace
where n.nspname = 'public'
  and d.defaclobjtype = 'r'
  and pg_get_userbyid(d.defaclrole) = 'postgres';

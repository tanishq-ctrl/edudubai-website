-- 0003_table_privileges.sql
--
-- Applies the same column/least-privilege treatment as 0002 to the remaining
-- five tables. Fixes a live bug and removes several over-grants.
--
-- THE BUG
-- No table in this database granted SELECT to `authenticated`:
--
--   relacl was {anon=awdDxtm, authenticated=awdDxtm}  -- note: no 'r'
--
-- so every dashboard read failed. src/server/dashboard/queries.ts catches the
-- error and returns [], which is why the dashboard rendered empty payments,
-- enrollments and support requests instead of showing an error. The visible
-- symptom was "Error fetching payments: {}" in the server console.
--
-- THE OVER-GRANTS
-- The same grants handed anon and authenticated INSERT, UPDATE, DELETE and
-- TRUNCATE on all five tables:
--   * TRUNCATE is NOT subject to row level security, so it bypassed every
--     policy on these tables.
--   * The payments INSERT policy only checks auth.uid() = user_id, so a
--     signed-in user could fabricate their own payment row with
--     status = 'SUCCESS' and any amount.
--
-- WHAT THE APPLICATION ACTUALLY NEEDS (verified against the code)
--   enrollments       read only   - no caller inserts; queries.ts
--                                   createEnrollment has no callers and
--                                   actions/courses.ts createEnrollment is a
--                                   mock that writes nothing
--   payments          read only   - the payment gateway was removed; nothing
--                                   inserts, and clients must never be able to
--                                   write payment records
--   support_requests  read+insert - dashboard/support/page.tsx:88 inserts via
--                                   the user session
--   trainer_applications     none - written and read only by the service role
--                                   (api/trainer/submit, api/trainer/files)
--   scholarship_applications none - service role only, per its existing policy
--
-- If a future feature needs client writes to enrollments or payments, add the
-- grant in a new migration deliberately rather than restoring a table-wide one.
--
-- Idempotent: safe to run more than once.

begin;

-- ---------------------------------------------------------------------------
-- Clean slate: nothing anonymous touches any of these tables, and no client
-- role keeps DELETE, TRUNCATE, REFERENCES or TRIGGER anywhere.
-- ---------------------------------------------------------------------------
revoke all on public.enrollments              from anon, authenticated;
revoke all on public.payments                 from anon, authenticated;
revoke all on public.support_requests         from anon, authenticated;
revoke all on public.trainer_applications     from anon, authenticated;
revoke all on public.scholarship_applications from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Re-grant only what the application uses. RLS still scopes every row to
-- auth.uid(), so SELECT here exposes a user only to their own records.
-- ---------------------------------------------------------------------------
grant select on public.enrollments      to authenticated;
grant select on public.payments         to authenticated;
grant select, insert on public.support_requests to authenticated;

-- trainer_applications and scholarship_applications are intentionally left
-- with no client grants: both are service-role only.
--
-- service_role retains full access on every table and is unaffected above.

commit;

-- ---------------------------------------------------------------------------
-- Verification. Expected:
--   select  -> t for enrollments, payments, support_requests; f elsewhere
--   insert  -> t for support_requests only
--   delete / truncate -> f everywhere
-- ---------------------------------------------------------------------------
select c.relname as tbl,
       has_table_privilege('authenticated', c.oid, 'SELECT')   as auth_select,
       has_table_privilege('authenticated', c.oid, 'INSERT')   as auth_insert,
       has_table_privilege('authenticated', c.oid, 'DELETE')   as auth_delete,
       has_table_privilege('authenticated', c.oid, 'TRUNCATE') as auth_truncate,
       has_table_privilege('anon', c.oid, 'SELECT')            as anon_select,
       has_table_privilege('anon', c.oid, 'TRUNCATE')          as anon_truncate
from pg_class c
where c.relnamespace = 'public'::regnamespace
  and c.relkind = 'r'
order by 1;

# EduDubai Website

Marketing and enrolment site for EduDubai — online AML, CAMS and compliance
certification training. Next.js 14 App Router, deployed on Vercel (`fra1`).

## Commands

```bash
npm run dev         # local dev server
npm run build       # prisma generate && next build
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm test            # vitest run
```

Node 20 (`.nvmrc`). CI (`.github/workflows/ci.yml`) runs typecheck, lint, test
and build on every push and PR to `main`.

## Architecture

- **`src/app`** — App Router pages and `src/app/api/*` route handlers.
- **`src/components`** — shared UI. `ui/` is shadcn-style primitives on Radix;
  `sections/` are page-level composed blocks.
- **`src/server/actions`** — `"use server"` server actions.
- **`src/server/dashboard/queries.ts`** — Supabase reads for the signed-in
  dashboard (enrollments, payments, support requests).
- **`src/lib`** — integrations and helpers (Supabase clients, Prisma, Resend,
  Systeme.io CRM, Turnstile, rate limiting, logging).

### The database schema is NOT the Prisma schema

`prisma/schema.prisma` describes tables that **do not exist**. It was never
applied (`prisma/migrations` is gitignored and `db:push` was never run against
production). Do not trust it, and do not use it to reason about the data.

The real schema was built by hand in the Supabase SQL editor. `public` contains
exactly six tables:

`enrollments`, `payments`, `profiles`, `scholarship_applications`,
`support_requests`, `trainer_applications`

There is no `users` table and no `courses` table. Users are `auth.users`
(Supabase Auth) joined to `public.profiles` on `id`; **email lives only in
`auth.users`**, never in `profiles`.

Access everything through `supabase-js`, not Prisma. Prisma remains only in
`src/lib/prisma.ts` and the `SELECT 1` keep-alive probe, which needs no tables.

### Courses: two sources, one switch

The catalogue exists in both places and `COURSES_SOURCE` decides which one the
public site reads:

- `file` (default) - `src/lib/courses.ts`, the original static array
- `db` - `public.courses`, which is what makes admin edits visible

The switch lives in `src/server/actions/courses.ts`; every consumer goes
through its `*New()` functions, so pages never know which source they got. The
database path falls back to the file if a query returns nothing, so an outage
degrades to the old catalogue rather than an empty course list.

`src/lib/courses-db.ts` maps rows onto the same `Course` type. Note `Course.id`
maps from `legacy_id`, not the uuid primary key: `course-hero.tsx` switches on
`'cams'`, `'cgss'`, `'tbml'` and `'certified-compliance-manager'` to pick hero
content, and two courses have an id that differs from their slug.

Two checks guard the cutover, and both must pass before flipping to `db`:

```bash
npx vite-node -c vitest.config.ts scripts/verify-course-seed.ts <db.json>
npx vite-node -c vitest.config.ts scripts/compare-course-sources.ts
```

Both canonicalise object keys, because `jsonb` does not preserve key order
(it does preserve array order, which is meaningful here).

Once the file is retired, delete `src/lib/courses.ts`, the fallback branches
and this flag.

### Roles and admin access

`profiles.role` is `STUDENT` | `INSTRUCTOR` | `ADMIN`, enforced by a check
constraint. `src/app/dashboard/profile/page.tsx` upserts `profiles` straight
from the browser, so `role` must never be client-writable — otherwise any user
can make themselves an admin.

**`authenticated` therefore holds COLUMN-level grants on `profiles`, not a
table-level grant** (see `supabase/migrations/0002_profiles_privileges.sql`):
SELECT on every column, INSERT on everything except `role`, UPDATE on only
`full_name`, `phone`, `country`, `updated_at`. No DELETE, no TRUNCATE. `anon`
has nothing at all.

The trap: **a column-level REVOKE cannot carve an exception out of a
table-level GRANT.** `revoke update (role) ... from authenticated` silently
does nothing while a table-wide `grant update` is in force, and any column
added later is automatically covered by it. Never run
`grant <priv> on public.profiles to authenticated` — it wipes out the
column-level scheme and reopens the hole. Re-grant per column instead, and
verify with:

```sql
select has_column_privilege('authenticated','public.profiles','role','UPDATE');
-- must be false
```

Listing all users requires reading past RLS, so it goes through
`createAdminClient()` (`src/lib/supabase/admin.ts`) — service role, RLS
bypassed. Only call it after `getCurrentAdmin()` has passed.

## Security rules

These were all real defects at some point. Do not regress them.

- **Every `"use server"` action is a public endpoint.** Next.js assigns each one
  an ID that anyone can POST to. Gating the page that calls it is not enough —
  every privileged action must check the caller itself. See `assertAdmin()` in
  `src/server/actions/admin.ts`.
- **Admin access** is `getCurrentAdmin()` from `src/lib/auth-guards.ts`, which
  checks the Prisma `UserRole`. Never trust a role supplied by the client.
- **`SUPABASE_SERVICE_ROLE_KEY` bypasses RLS.** Any route using it must
  authorise the caller first — see `src/app/api/trainer/files/[filename]`.
- **Client-supplied redirect targets** go through `safeRedirectPath()`
  (`src/lib/safe-redirect.ts`), never straight into `new URL(next, base)`.
- **Public POST routes** get `enforceRateLimit()` (`src/lib/rate-limit.ts`) and,
  for lead forms, `verifyTurnstile()`. Note the limiter is per-instance
  in-memory — see its file comment for the limitation.
- **Never `console.log` diagnostics.** Use `logger.debug()`
  (`src/lib/logger.ts`), which is silent in production. Middleware runs on every
  request; its output previously leaked user IDs into log exports.
- **Never commit log exports or anything with request PII.** `/logs` and
  `*log-export*.csv` are gitignored.

## Hosting

One Supabase project backs everything: Postgres (via Prisma AND the supabase-js
client — same database, two access paths), Auth, and Storage. It runs on the
**free tier**, which is correct for this workload; do not migrate off it to
save money, and in particular do not replace Supabase Auth — 17 files depend on
it and it is free to 50k monthly active users.

Free-tier projects pause after 7 days without **database** activity. Page
renders do not count, and most public pages never query Postgres, so
`/api/health/db` runs `SELECT 1` on a daily Vercel cron (`vercel.json`) to keep
the project warm. Set `CRON_SECRET` in the Vercel environment; the route
rejects anything without that bearer token. If the site is ever moved off
Vercel, this cron must be recreated or the database will pause.

## Conventions

- Path alias `@/*` → `src/*`.
- Validate all external input with zod at the boundary, including server action
  arguments — they arrive from the network, not from your own UI.
- Every page needs a `metadata` export. Client-component pages can't have one,
  so their metadata lives in a sibling `layout.tsx`. Signed-in and auth routes
  set `robots: { index: false, follow: false }`.
- Tests are `*.test.ts` next to the file they cover, run by Vitest in a node
  environment.

## Not wired up

There is **no payment gateway**. Razorpay was removed deliberately — the
integration was unreachable dead code with an unauthenticated order-creation
action that let the client set its own price. `/dashboard/payments` still
renders historical rows from the Supabase `payments` table, and the
`PAYMENT_SUCCESS` template in `src/lib/email.ts` is kept for whenever payments
are reintroduced.

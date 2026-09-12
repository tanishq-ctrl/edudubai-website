# Database migrations

The schema in this database was originally built ad hoc in the Supabase SQL
editor, which is how `prisma/schema.prisma` drifted into describing tables that
do not exist. Every schema change from now on belongs in a numbered file here,
committed to git, so the repository and the database cannot silently disagree.

## Applying

Paste the file into the Supabase SQL editor and run it, or:

```bash
psql "$DATABASE_URL" -f supabase/migrations/0001_profile_roles.sql
```

## Rules

- Numbered, append-only. Never edit a migration that has been applied — add a
  new one.
- Idempotent where practical (`if not exists`, `drop ... if exists`) so a
  re-run is harmless.
- Additive changes (CREATE TABLE, ADD COLUMN) are low risk. Anything
  destructive — DROP, type changes, data backfills — needs a verified
  `pg_dump` backup first, because this project is on the Supabase free tier and
  has no automated backups.
- New tables need their RLS policies written in the same migration, not added
  later.

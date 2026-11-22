-- The public-schema move, RLS policies, and account visibility column are
-- implemented by the preceding custom migration. This migration advances the
-- Drizzle snapshot so future schema diffs understand that move.
SELECT 1;

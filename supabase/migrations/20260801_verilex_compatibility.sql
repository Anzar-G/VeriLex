-- Run after 20260801_verilex_dynamic_features.sql.
-- Completes new columns on tables that may have existed before the main migration.

alter table public.discussions add column if not exists deleted_by uuid references auth.users(id) on delete set null;
alter table public.discussions add column if not exists updated_at timestamptz not null default now();

alter table public.maxim_sources add column if not exists citation_data jsonb not null default '{}'::jsonb;
alter table public.maxim_sources add column if not exists official_identifier text;
alter table public.maxim_sources add column if not exists created_by uuid references auth.users(id) on delete set null;

alter table public.maxim_relations add column if not exists created_by uuid references auth.users(id) on delete set null;
alter table public.maxim_relations add column if not exists created_at timestamptz not null default now();

alter table public.reports add column if not exists updated_at timestamptz not null default now();
alter table public.edit_proposals add column if not exists updated_at timestamptz not null default now();

alter table public.user_bans add column if not exists lifted_at timestamptz;
alter table public.user_bans add column if not exists lifted_by uuid references auth.users(id) on delete set null;

alter table public.activity_logs add column if not exists details jsonb not null default '{}'::jsonb;

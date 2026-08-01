-- VeriLex: dynamic features, governance, learning progress, and audit trail.
-- Run this once in Supabase SQL Editor (or through the Supabase CLI) as the
-- database owner. It is intentionally additive and safe to re-run.

create extension if not exists pgcrypto;

-- ── User identity and RBAC ────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('reader','contributor','editor','reviewer','senior_editor','subject_expert','administrator')),
  legal_fields text[] not null default '{}',
  granted_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

-- ── Shared helpers ────────────────────────────────────────────────────────
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'administrator') $$;

create or replace function public.has_role_at_least(required_role text)
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid()
      and case role
        when 'reader' then 0 when 'contributor' then 1 when 'reviewer' then 2
        when 'subject_expert' then 2 when 'editor' then 3 when 'senior_editor' then 4
        when 'administrator' then 5 else 0 end >=
      case required_role
        when 'reader' then 0 when 'contributor' then 1 when 'reviewer' then 2
        when 'subject_expert' then 2 when 'editor' then 3 when 'senior_editor' then 4
        when 'administrator' then 5 else 99 end
  )
$$;

create or replace function public.create_profile_for_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
          coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'reader') on conflict do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.create_profile_for_new_user();

-- Existing projects can already have maxims. These alterations fill the
-- metadata required by article lifecycle and precise citation/versioning.
alter table public.maxims add column if not exists status text not null default 'draft'
  check (status in ('draft','reviewed','stable','featured','locked'));
alter table public.maxims add column if not exists difficulty text not null default 'dasar'
  check (difficulty in ('dasar','menengah','lanjutan'));
alter table public.maxims add column if not exists version_number integer not null default 1;
alter table public.maxims add column if not exists current_revision_id uuid;
alter table public.maxims add column if not exists locked_at timestamptz;
alter table public.maxims add column if not exists locked_by uuid references auth.users(id) on delete set null;
alter table public.maxims add column if not exists official_version_at timestamptz;
alter table public.maxims add column if not exists created_by uuid references auth.users(id) on delete set null;

-- ── Editorial workflow ────────────────────────────────────────────────────
create table if not exists public.maxim_revisions (
  id uuid primary key default gen_random_uuid(),
  maxim_id text not null references public.maxims(id) on delete cascade,
  revision_number integer not null,
  editor_id uuid references auth.users(id) on delete set null,
  editor_name text not null default 'Anonim',
  edit_reason text not null check (length(trim(edit_reason)) >= 8),
  change_basis text check (change_basis in ('undang_undang','putusan','buku','jurnal','doktrin','tata_bahasa','rollback')),
  change_basis_detail text,
  snapshot jsonb not null,
  changes jsonb not null default '[]'::jsonb,
  diff_summary text,
  is_rollback boolean not null default false,
  rolled_back_from uuid references public.maxim_revisions(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (maxim_id, revision_number)
);
alter table public.maxim_revisions add column if not exists changes jsonb not null default '[]'::jsonb;

create or replace function public.next_revision_number(p_maxim_id text)
returns integer language sql stable as $$
  select coalesce(max(revision_number), 0) + 1 from public.maxim_revisions where maxim_id = p_maxim_id
$$;

create table if not exists public.edit_proposals (
  id uuid primary key default gen_random_uuid(),
  maxim_id text not null references public.maxims(id) on delete cascade,
  proposer_id uuid references auth.users(id) on delete set null,
  change_summary text not null,
  edit_reason text not null default 'Usulan revisi oleh kontributor',
  change_basis text,
  change_basis_detail text,
  proposed_data jsonb not null,
  status text not null default 'pending' check (status in ('pending','under_review','approved','rejected','withdrawn')),
  reviewer_id uuid references auth.users(id) on delete set null,
  reviewer_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.edit_proposals add column if not exists proposer_id uuid references auth.users(id) on delete set null;
alter table public.edit_proposals add column if not exists edit_reason text not null default 'Usulan revisi oleh kontributor';
alter table public.edit_proposals add column if not exists change_basis text;
alter table public.edit_proposals add column if not exists change_basis_detail text;

-- ── Sources and relationship graph ────────────────────────────────────────
create table if not exists public.maxim_sources (
  id uuid primary key default gen_random_uuid(),
  maxim_id text not null references public.maxims(id) on delete cascade,
  trust_level text not null check (trust_level in ('primer','doktrin','pendapat_ahli','pendukung')),
  source_type text not null,
  title text not null,
  author text,
  year integer check (year between 1 and 9999),
  url text,
  description text,
  citation_data jsonb not null default '{}'::jsonb,
  official_identifier text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.maxim_sources add column if not exists citation_data jsonb not null default '{}'::jsonb;
alter table public.maxim_sources add column if not exists official_identifier text;
alter table public.maxim_sources add column if not exists created_by uuid references auth.users(id) on delete set null;

create table if not exists public.maxim_relations (
  id uuid primary key default gen_random_uuid(),
  from_maxim_id text not null references public.maxims(id) on delete cascade,
  to_maxim_id text not null references public.maxims(id) on delete cascade,
  relation_type text not null check (relation_type in ('sinonim','antonim','hierarkis','turunan','berlawanan','terkait')),
  description text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  check (from_maxim_id <> to_maxim_id),
  unique (from_maxim_id, to_maxim_id, relation_type)
);

-- ── Reports, discussion, reputation ───────────────────────────────────────
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  maxim_id text not null references public.maxims(id) on delete cascade,
  category text not null check (category in ('hoaks','referensi_salah','salah_kutip_pasal','latin_salah','terjemahan_salah','vandalisme','plagiarisme','spam','lainnya')),
  description text not null check (length(trim(description)) >= 10),
  reporter_id uuid references auth.users(id) on delete set null,
  reporter_name text not null default 'Anonim',
  status text not null default 'menunggu' check (status in ('menunggu','ditinjau','diterima','ditolak')),
  handler_id uuid references auth.users(id) on delete set null,
  handler_note text,
  handled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.discussions (
  id uuid primary key default gen_random_uuid(),
  maxim_id text not null references public.maxims(id) on delete cascade,
  parent_id uuid references public.discussions(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  author_name text not null default 'Anonim',
  content text not null check (length(trim(content)) between 2 and 5000),
  is_deleted boolean not null default false,
  deleted_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.editor_reputation (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  score integer not null default 0,
  edits_accepted integer not null default 0,
  edits_rejected integer not null default 0,
  references_added integer not null default 0,
  reports_valid integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.reputation_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null check (event_type in ('edit_accepted','reference_added','edit_reverted','misinformation','report_valid')),
  points integer not null,
  reference_type text,
  reference_id uuid,
  actor_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ── Personal learning data ─────────────────────────────────────────────────
create table if not exists public.user_bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  maxim_id text not null references public.maxims(id) on delete cascade,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, maxim_id)
);

create table if not exists public.flashcard_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  maxim_id text not null references public.maxims(id) on delete cascade,
  level smallint not null default 1 check (level between 1 and 5),
  repetitions integer not null default 0,
  next_review_at timestamptz not null default now(),
  last_reviewed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, maxim_id)
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  maxim_id text references public.maxims(id) on delete set null,
  prompt text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array'),
  correct_option_index smallint not null check (correct_option_index >= 0),
  explanation text,
  difficulty text not null default 'dasar' check (difficulty in ('dasar','menengah','lanjutan')),
  is_active boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  score_percentage numeric(5,2) not null check (score_percentage between 0 and 100),
  total_questions integer not null check (total_questions > 0),
  correct_answers integer not null check (correct_answers between 0 and total_questions),
  answers jsonb not null default '[]'::jsonb,
  completed_at timestamptz not null default now()
);

-- ── Operational logs and bans ──────────────────────────────────────────────
create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  user_name text,
  action text not null,
  target_type text,
  target_id text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  target_type text,
  target_id text,
  method text,
  ip_hash text,
  user_agent text,
  device text,
  country_code text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.user_bans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ban_type text not null check (ban_type in ('warning','temporary','permanent','ip')),
  reason text not null,
  issued_by uuid references auth.users(id) on delete set null,
  issued_by_name text not null default 'Administrator',
  expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  lifted_at timestamptz,
  lifted_by uuid references auth.users(id) on delete set null
);

-- Indexes used by dashboards and per-user views.
create index if not exists maxim_revisions_maxim_created_idx on public.maxim_revisions(maxim_id, created_at desc);
create index if not exists edit_proposals_status_created_idx on public.edit_proposals(status, created_at desc);
create index if not exists reports_status_created_idx on public.reports(status, created_at desc);
create index if not exists discussions_maxim_created_idx on public.discussions(maxim_id, created_at);
create index if not exists activity_logs_created_idx on public.activity_logs(created_at desc);
create index if not exists audit_logs_created_idx on public.audit_logs(created_at desc);

-- RLS: user-owned learning data is accessible only by its owner. Editorial
-- tables are read through authenticated server routes; direct mutation is off.
alter table public.user_bookmarks enable row level security;
alter table public.flashcard_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

drop policy if exists "own bookmarks" on public.user_bookmarks;
create policy "own bookmarks" on public.user_bookmarks for all using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "own flashcard progress" on public.flashcard_progress;
create policy "own flashcard progress" on public.flashcard_progress for all using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "own quiz attempts" on public.quiz_attempts;
create policy "own quiz attempts" on public.quiz_attempts for all using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "profiles readable by authenticated users" on public.profiles;
create policy "profiles readable by authenticated users" on public.profiles for select to authenticated using (true);
drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
drop policy if exists "own roles readable" on public.user_roles;
create policy "own roles readable" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.is_admin());

-- Initialise the default reader role for users created before this migration.
insert into public.user_roles (user_id, role)
select id, 'reader' from auth.users
on conflict do nothing;

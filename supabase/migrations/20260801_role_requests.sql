-- Role application workflow. Run in Supabase SQL Editor.
create table if not exists public.role_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  requested_role text not null check (requested_role in ('contributor','editor','reviewer','senior_editor','subject_expert')),
  legal_fields text[] not null default '{}',
  motivation text not null check (length(trim(motivation)) >= 30),
  qualifications text,
  status text not null default 'pending' check (status in ('pending','under_review','approved','rejected','withdrawn')),
  reviewer_id uuid references auth.users(id) on delete set null,
  reviewer_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists role_requests_pending_per_role_idx
  on public.role_requests(user_id, requested_role) where status in ('pending','under_review');
create index if not exists role_requests_status_created_idx on public.role_requests(status, created_at desc);

alter table public.role_requests enable row level security;
drop policy if exists "own role requests" on public.role_requests;
create policy "own role requests" on public.role_requests for select to authenticated using (user_id = auth.uid());

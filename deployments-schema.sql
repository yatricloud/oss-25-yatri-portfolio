-- Deployments table for live portfolio management
create table if not exists public.deployments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  project_name text not null,
  status text not null check (status in ('pending', 'building', 'ready', 'error')),
  live_url text,
  html_content text,
  profile_data jsonb,
  config jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.deployments enable row level security;

-- Policies for deployments
create policy "Users can view their own deployments"
  on public.deployments
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create their own deployments"
  on public.deployments
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own deployments"
  on public.deployments
  for update
  to authenticated
  using (auth.uid() = user_id);

-- Public read access for live URLs (for sharing)
create policy "Public can view ready deployments"
  on public.deployments
  for select
  to anon
  using (status = 'ready' and live_url is not null);

-- Index for performance
create index if not exists idx_deployments_user_id on public.deployments(user_id);
create index if not exists idx_deployments_status on public.deployments(status);
create index if not exists idx_deployments_live_url on public.deployments(live_url) where live_url is not null;

import { supabase, SUPABASE_AVAILABLE } from '../lib/supabase';

export const checkDatabaseSetup = async () => {
  if (!SUPABASE_AVAILABLE || !supabase) {
    console.error('Supabase not configured');
    return false;
  }

  try {
    // Check if deployments table exists by trying to query it
    const { data, error } = await supabase
      .from('deployments')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Deployments table error:', error);
      if (error.code === '42P01') {
        console.error('Deployments table does not exist. Please run the SQL schema first.');
        return false;
      }
      throw error;
    }

    console.log('Deployments table exists and is accessible');
    return true;
  } catch (error) {
    console.error('Database setup check failed:', error);
    return false;
  }
};

export const createDeploymentsTable = async () => {
  if (!SUPABASE_AVAILABLE || !supabase) {
    console.error('Supabase not configured');
    return false;
  }

  try {
    // This would need to be run in Supabase SQL editor
    console.log('Please run the following SQL in your Supabase SQL editor:');
    console.log(`
-- Deployments table for live portfolio management
create table if not exists public.deployments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  project_name text not null,
  status text not null check (status in ('pending', 'building', 'ready', 'error')),
  live_url text,
  html_content text,
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
    `);
    return false;
  } catch (error) {
    console.error('Error creating deployments table:', error);
    return false;
  }
};

-- =====================================================
-- YATRI PORTFOLIO - COMPLETE DATABASE SETUP
-- =====================================================
-- This file contains ALL the SQL needed to set up the portfolio database
-- Run this single file to set up everything at once

-- =====================================================
-- 1. CORE TABLES
-- =====================================================

-- Admin Users Table
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- GitHub URLs Table
create table if not exists public.github_urls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  url text not null,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Profiles Table
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text,
  headline text,
  summary text,
  email text,
  phone text,
  location text,
  website text,
  github text,
  linkedin text,
  avatar_url text,
  resume_json jsonb,
  resume_pdf_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Experiences Table
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  company text not null,
  position text not null,
  start_date text,
  end_date text,
  summary text,
  highlights text[],
  location text,
  order_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Educations Table
create table if not exists public.educations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  institution text not null,
  area text,
  study_type text,
  start_date text,
  end_date text,
  score text,
  courses text[],
  order_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Skills Table
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  keywords text[],
  level text,
  order_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Projects Table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  description text,
  url text,
  github_url text,
  technologies text[],
  featured boolean default false,
  order_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Contact Messages Table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  inquiry_type text default 'job-opportunity',
  created_at timestamptz default now()
);

-- Deployments Table
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

-- =====================================================
-- 2. ENABLE ROW LEVEL SECURITY
-- =====================================================

alter table public.admin_users enable row level security;
alter table public.github_urls enable row level security;
alter table public.profiles enable row level security;
alter table public.experiences enable row level security;
alter table public.educations enable row level security;
alter table public.skills enable row level security;
alter table public.projects enable row level security;
alter table public.contact_messages enable row level security;
alter table public.deployments enable row level security;

-- =====================================================
-- 3. RLS POLICIES
-- =====================================================

-- Admin Users Policies
create policy "Users can view their own admin record"
  on public.admin_users
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert their own admin record"
  on public.admin_users
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- GitHub URLs Policies
create policy "Anyone can view GitHub URLs"
  on public.github_urls
  for select
  to public
  using (true);

create policy "Authenticated users can insert GitHub URLs"
  on public.github_urls
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own GitHub URLs"
  on public.github_urls
  for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own GitHub URLs"
  on public.github_urls
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Profiles Policies
create policy "Anyone can view profiles"
  on public.profiles
  for select
  to public
  using (true);

create policy "Users can insert their own profiles"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own profiles"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own profiles"
  on public.profiles
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Experiences Policies
create policy "Anyone can view experiences"
  on public.experiences
  for select
  to public
  using (true);

create policy "Users can insert their own experiences"
  on public.experiences
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own experiences"
  on public.experiences
  for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own experiences"
  on public.experiences
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Educations Policies
create policy "Anyone can view educations"
  on public.educations
  for select
  to public
  using (true);

create policy "Users can insert their own educations"
  on public.educations
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own educations"
  on public.educations
  for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own educations"
  on public.educations
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Skills Policies
create policy "Anyone can view skills"
  on public.skills
  for select
  to public
  using (true);

create policy "Users can insert their own skills"
  on public.skills
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own skills"
  on public.skills
  for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own skills"
  on public.skills
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Projects Policies
create policy "Anyone can view projects"
  on public.projects
  for select
  to public
  using (true);

create policy "Users can insert their own projects"
  on public.projects
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public.projects
  for update
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public.projects
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Contact Messages Policies
create policy "Anyone can insert contact messages"
  on public.contact_messages
  for insert
  to public
  with check (true);

create policy "Authenticated users can view contact messages"
  on public.contact_messages
  for select
  to authenticated
  using (true);

-- Deployments Policies
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

create policy "Public can view ready deployments"
  on public.deployments
  for select
  to anon
  using (status = 'ready' and live_url is not null);

-- =====================================================
-- 4. STORAGE SETUP
-- =====================================================

-- Create resumes bucket
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', true)
on conflict (id) do nothing;

-- Storage policies for resumes bucket
create policy "Anyone can view resume files"
  on storage.objects
  for select
  to public
  using (bucket_id = 'resumes');

create policy "Authenticated users can upload resume files"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'resumes');

create policy "Users can update their own resume files"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'resumes' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete their own resume files"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'resumes' and auth.uid()::text = (storage.foldername(name))[1]);

-- =====================================================
-- 5. INDEXES FOR PERFORMANCE
-- =====================================================

create index if not exists idx_admin_users_user_id on public.admin_users(user_id);
create index if not exists idx_github_urls_user_id on public.github_urls(user_id);
create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_experiences_user_id on public.experiences(user_id);
create index if not exists idx_educations_user_id on public.educations(user_id);
create index if not exists idx_skills_user_id on public.skills(user_id);
create index if not exists idx_projects_user_id on public.projects(user_id);
create index if not exists idx_contact_messages_created_at on public.contact_messages(created_at);
create index if not exists idx_deployments_user_id on public.deployments(user_id);
create index if not exists idx_deployments_status on public.deployments(status);
create index if not exists idx_deployments_live_url on public.deployments(live_url) where live_url is not null;

-- =====================================================
-- 6. FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Function to automatically create admin user on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.admin_users (user_id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Apply update triggers to all tables with updated_at
create trigger update_admin_users_updated_at before update on public.admin_users for each row execute procedure update_updated_at_column();
create trigger update_github_urls_updated_at before update on public.github_urls for each row execute procedure update_updated_at_column();
create trigger update_profiles_updated_at before update on public.profiles for each row execute procedure update_updated_at_column();
create trigger update_experiences_updated_at before update on public.experiences for each row execute procedure update_updated_at_column();
create trigger update_educations_updated_at before update on public.educations for each row execute procedure update_updated_at_column();
create trigger update_skills_updated_at before update on public.skills for each row execute procedure update_updated_at_column();
create trigger update_projects_updated_at before update on public.projects for each row execute procedure update_updated_at_column();
create trigger update_deployments_updated_at before update on public.deployments for each row execute procedure update_updated_at_column();

-- Trigger to automatically create admin user on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =====================================================
-- 7. UTILITY FUNCTIONS
-- =====================================================

-- Function to check if user is admin
create or replace function public.is_admin(user_id_param uuid)
returns boolean as $$
begin
  return exists(
    select 1 from public.admin_users 
    where user_id = user_id_param
  );
end;
$$ language plpgsql security definer;

-- Function to get latest profile (for public access)
create or replace function public.get_latest_profile()
returns jsonb as $$
declare
  profile_data jsonb;
begin
  select to_jsonb(p.*) into profile_data
  from public.profiles p
  order by p.updated_at desc
  limit 1;
  
  return profile_data;
end;
$$ language plpgsql security definer;

-- Function to get latest experiences (for public access)
create or replace function public.get_latest_experiences()
returns jsonb as $$
declare
  experiences_data jsonb;
begin
  select jsonb_agg(to_jsonb(e.*) order by e.order_index) into experiences_data
  from public.experiences e
  where e.user_id = (
    select p.user_id from public.profiles p
    order by p.updated_at desc
    limit 1
  );
  
  return coalesce(experiences_data, '[]'::jsonb);
end;
$$ language plpgsql security definer;

-- Function to get latest educations (for public access)
create or replace function public.get_latest_educations()
returns jsonb as $$
declare
  educations_data jsonb;
begin
  select jsonb_agg(to_jsonb(e.*) order by e.order_index) into educations_data
  from public.educations e
  where e.user_id = (
    select p.user_id from public.profiles p
    order by p.updated_at desc
    limit 1
  );
  
  return coalesce(educations_data, '[]'::jsonb);
end;
$$ language plpgsql security definer;

-- Function to get latest skills (for public access)
create or replace function public.get_latest_skills()
returns jsonb as $$
declare
  skills_data jsonb;
begin
  select jsonb_agg(to_jsonb(s.*) order by s.order_index) into skills_data
  from public.skills s
  where s.user_id = (
    select p.user_id from public.profiles p
    order by p.updated_at desc
    limit 1
  );
  
  return coalesce(skills_data, '[]'::jsonb);
end;
$$ language plpgsql security definer;

-- Function to get latest projects (for public access)
create or replace function public.get_latest_projects()
returns jsonb as $$
declare
  projects_data jsonb;
begin
  select jsonb_agg(to_jsonb(p.*) order by p.order_index) into projects_data
  from public.projects p
  where p.user_id = (
    select pr.user_id from public.profiles pr
    order by pr.updated_at desc
    limit 1
  );
  
  return coalesce(projects_data, '[]'::jsonb);
end;
$$ language plpgsql security definer;

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================

-- Success message
do $$
begin
  raise notice 'Yatri Portfolio database setup completed successfully!';
  raise notice 'All tables, policies, functions, and triggers have been created.';
  raise notice 'You can now start using the portfolio application.';
end $$;

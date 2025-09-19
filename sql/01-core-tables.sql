-- =====================================================
-- YATRI PORTFOLIO - CORE DATABASE SETUP
-- =====================================================
-- This file contains all the core tables needed for the portfolio system
-- Run these scripts in order in your Supabase SQL Editor

-- =====================================================
-- 1. ADMIN USERS TABLE
-- =====================================================
-- Stores admin users who can manage the portfolio
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.admin_users enable row level security;

-- Policies for admin_users
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

-- =====================================================
-- 2. GITHUB URLS TABLE
-- =====================================================
-- Stores GitHub repository URLs for fetching projects
create table if not exists public.github_urls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  url text not null,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.github_urls enable row level security;

-- Policies for github_urls
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

-- =====================================================
-- 3. PROFILES TABLE
-- =====================================================
-- Stores main profile information from resume uploads
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

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for profiles
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

-- =====================================================
-- 4. EXPERIENCES TABLE
-- =====================================================
-- Stores work experience data
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

-- Enable RLS
alter table public.experiences enable row level security;

-- Policies for experiences
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

-- =====================================================
-- 5. EDUCATIONS TABLE
-- =====================================================
-- Stores education data
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

-- Enable RLS
alter table public.educations enable row level security;

-- Policies for educations
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

-- =====================================================
-- 6. SKILLS TABLE
-- =====================================================
-- Stores skills data
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

-- Enable RLS
alter table public.skills enable row level security;

-- Policies for skills
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

-- =====================================================
-- 7. PROJECTS TABLE
-- =====================================================
-- Stores projects data
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

-- Enable RLS
alter table public.projects enable row level security;

-- Policies for projects
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

-- =====================================================
-- 8. CONTACT MESSAGES TABLE
-- =====================================================
-- Stores contact form submissions
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  inquiry_type text default 'job-opportunity',
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.contact_messages enable row level security;

-- Policies for contact_messages
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

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
create index if not exists idx_admin_users_user_id on public.admin_users(user_id);
create index if not exists idx_github_urls_user_id on public.github_urls(user_id);
create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_experiences_user_id on public.experiences(user_id);
create index if not exists idx_educations_user_id on public.educations(user_id);
create index if not exists idx_skills_user_id on public.skills(user_id);
create index if not exists idx_projects_user_id on public.projects(user_id);
create index if not exists idx_contact_messages_created_at on public.contact_messages(created_at);

-- =====================================================
-- UPDATE TRIGGERS
-- =====================================================
-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply update triggers to all tables with updated_at
create trigger update_admin_users_updated_at before update on public.admin_users for each row execute procedure update_updated_at_column();
create trigger update_github_urls_updated_at before update on public.github_urls for each row execute procedure update_updated_at_column();
create trigger update_profiles_updated_at before update on public.profiles for each row execute procedure update_updated_at_column();
create trigger update_experiences_updated_at before update on public.experiences for each row execute procedure update_updated_at_column();
create trigger update_educations_updated_at before update on public.educations for each row execute procedure update_updated_at_column();
create trigger update_skills_updated_at before update on public.skills for each row execute procedure update_updated_at_column();
create trigger update_projects_updated_at before update on public.projects for each row execute procedure update_updated_at_column();

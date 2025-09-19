-- =====================================================
-- YATRI PORTFOLIO - FUNCTIONS AND TRIGGERS
-- =====================================================
-- This file contains utility functions and triggers
-- Run this after all tables are created (01, 02, 03)

-- =====================================================
-- UTILITY FUNCTIONS
-- =====================================================

-- Function to automatically create admin user on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.admin_users (user_id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Function to get user's profile data
create or replace function public.get_user_profile(user_id_param uuid)
returns jsonb as $$
declare
  profile_data jsonb;
begin
  select to_jsonb(p.*) into profile_data
  from public.profiles p
  where p.user_id = user_id_param
  limit 1;
  
  return profile_data;
end;
$$ language plpgsql security definer;

-- Function to get user's experiences
create or replace function public.get_user_experiences(user_id_param uuid)
returns jsonb as $$
declare
  experiences_data jsonb;
begin
  select jsonb_agg(to_jsonb(e.*) order by e.order_index) into experiences_data
  from public.experiences e
  where e.user_id = user_id_param;
  
  return coalesce(experiences_data, '[]'::jsonb);
end;
$$ language plpgsql security definer;

-- Function to get user's educations
create or replace function public.get_user_educations(user_id_param uuid)
returns jsonb as $$
declare
  educations_data jsonb;
begin
  select jsonb_agg(to_jsonb(e.*) order by e.order_index) into educations_data
  from public.educations e
  where e.user_id = user_id_param;
  
  return coalesce(educations_data, '[]'::jsonb);
end;
$$ language plpgsql security definer;

-- Function to get user's skills
create or replace function public.get_user_skills(user_id_param uuid)
returns jsonb as $$
declare
  skills_data jsonb;
begin
  select jsonb_agg(to_jsonb(s.*) order by s.order_index) into skills_data
  from public.skills s
  where s.user_id = user_id_param;
  
  return coalesce(skills_data, '[]'::jsonb);
end;
$$ language plpgsql security definer;

-- Function to get user's projects
create or replace function public.get_user_projects(user_id_param uuid)
returns jsonb as $$
declare
  projects_data jsonb;
begin
  select jsonb_agg(to_jsonb(p.*) order by p.order_index) into projects_data
  from public.projects p
  where p.user_id = user_id_param;
  
  return coalesce(projects_data, '[]'::jsonb);
end;
$$ language plpgsql security definer;

-- Function to get complete user portfolio data
create or replace function public.get_complete_portfolio(user_id_param uuid)
returns jsonb as $$
declare
  portfolio_data jsonb;
begin
  select jsonb_build_object(
    'profile', public.get_user_profile(user_id_param),
    'experiences', public.get_user_experiences(user_id_param),
    'educations', public.get_user_educations(user_id_param),
    'skills', public.get_user_skills(user_id_param),
    'projects', public.get_user_projects(user_id_param)
  ) into portfolio_data;
  
  return portfolio_data;
end;
$$ language plpgsql security definer;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger to automatically create admin user on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =====================================================
-- VIEWS
-- =====================================================

-- View for public portfolio data
create or replace view public.portfolio_view as
select 
  p.id,
  p.user_id,
  p.full_name,
  p.headline,
  p.summary,
  p.email,
  p.phone,
  p.location,
  p.website,
  p.github,
  p.linkedin,
  p.avatar_url,
  p.resume_pdf_url,
  p.created_at,
  p.updated_at
from public.profiles p;

-- View for public experiences
create or replace view public.experiences_view as
select 
  e.id,
  e.user_id,
  e.company,
  e.position,
  e.start_date,
  e.end_date,
  e.summary,
  e.highlights,
  e.location,
  e.order_index,
  e.created_at,
  e.updated_at
from public.experiences e;

-- View for public educations
create or replace view public.educations_view as
select 
  e.id,
  e.user_id,
  e.institution,
  e.area,
  e.study_type,
  e.start_date,
  e.end_date,
  e.score,
  e.courses,
  e.order_index,
  e.created_at,
  e.updated_at
from public.educations e;

-- View for public skills
create or replace view public.skills_view as
select 
  s.id,
  s.user_id,
  s.name,
  s.keywords,
  s.level,
  s.order_index,
  s.created_at,
  s.updated_at
from public.skills s;

-- View for public projects
create or replace view public.projects_view as
select 
  p.id,
  p.user_id,
  p.name,
  p.description,
  p.url,
  p.github_url,
  p.technologies,
  p.featured,
  p.order_index,
  p.created_at,
  p.updated_at
from public.projects p;

-- =====================================================
-- RLS POLICIES FOR VIEWS
-- =====================================================

-- Enable RLS on views
alter view public.portfolio_view set (security_invoker = true);
alter view public.experiences_view set (security_invoker = true);
alter view public.educations_view set (security_invoker = true);
alter view public.skills_view set (security_invoker = true);
alter view public.projects_view set (security_invoker = true);

-- =====================================================
-- HELPER FUNCTIONS FOR FRONTEND
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

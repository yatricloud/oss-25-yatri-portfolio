-- =====================================================
-- YATRI PORTFOLIO - STORAGE SETUP
-- =====================================================
-- This file sets up Supabase Storage for file uploads
-- Run this after the core tables (01-core-tables.sql)

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

-- Create resumes bucket for PDF uploads
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', true)
on conflict (id) do nothing;

-- =====================================================
-- STORAGE POLICIES
-- =====================================================

-- Policies for resumes bucket
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
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get public URL for a file
create or replace function get_public_url(bucket_name text, file_path text)
returns text as $$
begin
  return 'https://' || current_setting('app.settings.supabase_url') || '/storage/v1/object/public/' || bucket_name || '/' || file_path;
end;
$$ language plpgsql security definer;

-- Function to upload file to storage
create or replace function upload_resume(
  user_id_param uuid,
  file_name text,
  file_content bytea,
  content_type text default 'application/pdf'
)
returns text as $$
declare
  file_path text;
  public_url text;
begin
  -- Create file path: user_id/filename
  file_path := user_id_param::text || '/' || file_name;
  
  -- Insert file into storage
  insert into storage.objects (bucket_id, name, owner, metadata)
  values ('resumes', file_path, user_id_param, jsonb_build_object('contentType', content_type));
  
  -- Get public URL
  public_url := get_public_url('resumes', file_path);
  
  return public_url;
end;
$$ language plpgsql security definer;

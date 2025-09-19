import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const SUPABASE_AVAILABLE = Boolean(supabaseUrl && supabaseAnonKey);

// Create a client only if environment variables are provided. Otherwise, export null.
export const supabase: SupabaseClient | null = SUPABASE_AVAILABLE
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;

// Types for our database
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
  created_at: string;
  updated_at: string;
}

export interface GitHubUrl {
  id: string;
  url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
}

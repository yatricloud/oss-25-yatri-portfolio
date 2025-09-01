import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

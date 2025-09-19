import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, SUPABASE_AVAILABLE } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!SUPABASE_AVAILABLE || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkAdminStatus(session?.user);
      if (session?.user) {
        ensureAdminRecord(session.user).catch(() => {});
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkAdminStatus(session?.user);
      if (session?.user) {
        ensureAdminRecord(session.user).catch(() => {});
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (user: User | null) => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    try {
      if (!SUPABASE_AVAILABLE || !supabase) {
        setIsAdmin(false);
        return;
      }
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', user.id)
        .eq('role', 'admin')
        .single();

      if (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!SUPABASE_AVAILABLE || !supabase) {
      return { error: new Error('Auth is not configured') };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    if (!SUPABASE_AVAILABLE || !supabase) {
      return { error: new Error('Auth is not configured') };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/login'
      }
    });
    // If we have a session or user, attempt to create admin record immediately
    const currentUser = data?.user ?? (await supabase.auth.getUser()).data.user;
    if (currentUser) {
      try { await ensureAdminRecord(currentUser); } catch {}
    }
    return { error };
  };

  const signOut = async () => {
    if (!SUPABASE_AVAILABLE || !supabase) return;
    await supabase.auth.signOut();
  };

  const ensureAdminRecord = async (user: User) => {
    if (!SUPABASE_AVAILABLE || !supabase) return;
    try {
      // Upsert self into admin_users so a freshly signed-up user gets admin access without manual DB edits
      const { error } = await supabase
        .from('admin_users')
        .upsert({ id: user.id, email: user.email ?? '', role: 'admin', updated_at: new Date().toISOString() }, { onConflict: 'id' });
      if (error) {
        // Ignore policy errors silently; UI will still show non-admin
        // console.warn('ensureAdminRecord error', error);
      }
    } catch {}
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase, SUPABASE_AVAILABLE } from '../lib/supabase';
import { GitHubService } from '../services/githubService';

export interface ProfileData {
  fullName: string | null;
  headline: string | null;
  summary: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  website: string | null;
  github: string | null;
  linkedin: string | null;
  avatarUrl: string | null;
  resumePdfUrl: string | null;
  experiences: Array<{
    company: string;
    position: string;
    startDate: string | null;
    endDate: string | null;
    summary: string | null;
    highlights: string[];
    location: string | null;
  }>;
  educations: Array<{
    institution: string;
    area: string | null;
    studyType: string | null;
    startDate: string | null;
    endDate: string | null;
    score: string | null;
    courses: string[];
  }>;
  skills: Array<{
    name: string;
    keywords: string[];
    level: string | null;
  }>;
  certifications?: Array<{
    provider: string;
    items: string[];
  }>;
}

interface ProfileContextType {
  profile: ProfileData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!SUPABASE_AVAILABLE || !supabase) { setProfile(null); return; }
    try {
      setLoading(true);
      setError(null);
      // Fetch the latest updated public profile (works for both anonymous and authenticated users)
      const { data: p, error: pErr } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (pErr) throw pErr;

      const profileId = (p as any)?.id;
      const [{ data: exps }, { data: edus }, { data: sks }] = await Promise.all([
        supabase.from('experiences').select('*').eq('user_id', profileId).order('order_index', { ascending: true }),
        supabase.from('educations').select('*').eq('user_id', profileId).order('order_index', { ascending: true }),
        supabase.from('skills').select('*').eq('user_id', profileId).order('order_index', { ascending: true }),
      ]);

      const resumeJson = (p as any)?.resume_json || {};
      const pdfUrl = resumeJson?.pdf_url ?? null;

      let experiences = (exps || []).map((e: any) => ({
        company: e.company,
        position: e.position,
        startDate: e.start_date,
        endDate: e.end_date,
        summary: e.summary,
        highlights: e.highlights || [],
        location: e.location,
      }));
      let educations = (edus || []).map((e: any) => ({
        institution: e.institution,
        area: e.area,
        studyType: e.study_type,
        startDate: e.start_date,
        endDate: e.end_date,
        score: e.score,
        courses: e.courses || [],
      }));
      let skills = (sks || []).map((s: any) => ({
        name: s.name,
        keywords: s.keywords || [],
        level: s.level,
      }));

      // Fallback from stored resume_json if tables are empty
      if ((!experiences || experiences.length === 0) && resumeJson?.work_experience && Array.isArray(resumeJson.work_experience)) {
        experiences = resumeJson.work_experience.map((w: any) => ({
          company: w.company,
          position: w.title,
          startDate: (w.duration || '').split('–')[0]?.trim() || null,
          endDate: (w.duration || '').split('–')[1]?.trim() || null,
          summary: Array.isArray(w.responsibilities) ? w.responsibilities.join(' • ') : null,
          highlights: Array.isArray(w.responsibilities) ? w.responsibilities : [],
          location: null,
        }));
      }
      if ((!educations || educations.length === 0) && resumeJson?.education) {
        const e = resumeJson.education;
        educations = [{
          institution: e.institution || null,
          area: null,
          studyType: e.degree || null,
          startDate: null,
          endDate: e.year ? String(e.year) : null,
          score: e.cgpa ? `CGPA: ${e.cgpa}` : null,
          courses: [],
        }];
      }
      if ((!skills || skills.length === 0) && resumeJson?.skills && typeof resumeJson.skills === 'object') {
        skills = Object.entries(resumeJson.skills).map(([k, v]: any) => ({
          name: String(k).replace(/_/g, ' '),
          keywords: Array.isArray(v) ? v.map((x: any) => String(x)) : [],
          level: null,
        }));
      }

      // Certifications from resume_json
      let certifications: Array<{ provider: string; items: string[] }> = [];
      if (resumeJson?.certifications && typeof resumeJson.certifications === 'object') {
        certifications = Object.entries(resumeJson.certifications).map(([provider, items]: any) => ({
          provider: String(provider),
          items: Array.isArray(items) ? items.map((x: any) => String(x)) : [],
        }));
      }

      // Fetch GitHub location as fallback
      let githubLocation = null;
      try {
        const githubUser = await GitHubService.fetchUserProfile();
        githubLocation = githubUser?.location || null;
      } catch (e) {
        console.warn('Failed to fetch GitHub location:', e);
      }

      setProfile({
        fullName: (p as any)?.full_name ?? null,
        headline: (p as any)?.headline ?? null,
        summary: (p as any)?.summary ?? null,
        email: (p as any)?.email ?? null,
        phone: (p as any)?.phone ?? null,
        location: (p as any)?.location ?? githubLocation,
        website: (p as any)?.website ?? null,
        github: (p as any)?.github ?? null,
        linkedin: (p as any)?.linkedin ?? null,
        avatarUrl: (p as any)?.avatar_url ?? null,
        resumePdfUrl: pdfUrl,
        experiences,
        educations,
        skills,
        certifications,
      });
    } catch (e: any) {
      setError(e?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const value = useMemo(() => ({ profile, loading, error, refresh: fetchProfile }), [profile, loading, error]);

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
};



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Link, 
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  Loader,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';
import { supabase, SUPABASE_AVAILABLE, GitHubUrl } from '../lib/supabase';
import { DeploymentService, DeploymentStatus } from '../services/deploymentService';
import { checkDatabaseSetup } from '../utils/databaseSetup';

const AdminDashboard = () => {
  const { user, signOut, isAdmin } = useAuth();
  const { refresh } = useProfile();
  const [githubUrls, setGithubUrls] = useState<GitHubUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingUrl, setEditingUrl] = useState<GitHubUrl | null>(null);
  const [formData, setFormData] = useState({
    url: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [resumeUploading, setResumeUploading] = useState(false);
  const [resumePdfUploading, setResumePdfUploading] = useState(false);
  const [success, setSuccess] = useState('');
  
  // Deployment states
  const [deployments, setDeployments] = useState<DeploymentStatus[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [deploymentError, setDeploymentError] = useState<string | null>(null);
  const [databaseReady, setDatabaseReady] = useState<boolean | null>(null);

  useEffect(() => {
    fetchGitHubUrls();
    checkDatabaseSetup().then(setDatabaseReady);
    if (user) {
      fetchDeployments();
    }
  }, [user]);

  const fetchGitHubUrls = async () => {
    try {
      if (!SUPABASE_AVAILABLE || !supabase) {
        setGithubUrls([]);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('github_urls')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGithubUrls(data || []);
    } catch (error) {
      console.error('Error fetching GitHub URLs:', error);
      setError('Failed to load GitHub URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (!SUPABASE_AVAILABLE || !supabase) {
        setError('Backend not configured');
        return;
      }
      if (editingUrl) {
        // Update existing URL
        const { error } = await supabase
          .from('github_urls')
          .update({
            url: formData.url,
            description: formData.description || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingUrl.id);

        if (error) throw error;
      } else {
        // Add new URL
        const { error } = await supabase
          .from('github_urls')
          .insert({
            url: formData.url,
            description: formData.description || null,
            created_by: user?.id
          });

        if (error) throw error;
      }

      // Reset form and refresh data
      setFormData({ url: '', description: '' });
      setShowForm(false);
      setEditingUrl(null);
      await fetchGitHubUrls();
      
      // Trigger profile refresh to update GitHub data
      await refresh();
      
      // Notify other components to refresh
      localStorage.setItem('github-url-updated', 'true');
      
      setSuccess('GitHub URL updated! Profile data refreshed with new GitHub information.');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this URL?')) return;

    try {
      if (!SUPABASE_AVAILABLE || !supabase) {
        setError('Backend not configured');
        return;
      }
      const { error } = await supabase
        .from('github_urls')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchGitHubUrls();
      
      // Trigger profile refresh to update GitHub data
      await refresh();
      
      // Notify other components to refresh
      localStorage.setItem('github-url-updated', 'true');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEdit = (url: GitHubUrl) => {
    setEditingUrl(url);
    setFormData({
      url: url.url,
      description: url.description || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ url: '', description: '' });
    setShowForm(false);
    setEditingUrl(null);
    setError('');
    setSuccess('');
  };

  // Resume Upload & Parse (JSON Resume)
  const handleResumeFile = async (file: File) => {
    if (!file) return;
    if (!SUPABASE_AVAILABLE || !supabase) {
      setError('Backend not configured');
      return;
    }
    try {
      setResumeUploading(true);
      setError('');
      const text = await file.text();
      const json = JSON.parse(text);
      await upsertProfileFromResume(json);
      await refresh();
      setSuccess('Profile updated across the website.');
    } catch (e: any) {
      setError(e?.message || 'Failed to process resume');
    } finally {
      setResumeUploading(false);
    }
  };

  const upsertProfileFromResume = async (resume: any) => {
    if (!user || !supabase) return;

    // Support two formats:
    // A) JSON Resume (basics, work, education, skills, projects)
    // B) Provided custom JSON { name, contact, profile, work_experience, skills:{...}, projects:[...], education:{...} }

    const isCustom = !!resume.name || !!resume.contact || !!resume.work_experience;
    const basics = isCustom ? {
      name: resume.name,
      email: resume.contact?.email,
      phone: resume.contact?.phone,
      summary: resume.profile,
    } : (resume.basics || {});

    const socialGithub = isCustom ? (resume.contact?.links || []).find((l: string) => /github/i.test(l)) : (basics.profiles || []).find((p: any) => /github/i.test(p.network))?.url;
    const socialLinkedin = isCustom ? (resume.contact?.links || []).find((l: string) => /linkedin/i.test(l)) : (basics.profiles || []).find((p: any) => /linkedin/i.test(p.network))?.url;

    await supabase.from('profiles').upsert({
      id: user.id,
      full_name: basics.name ?? user.email ?? '',
      headline: basics.label ?? null,
      summary: basics.summary ?? null,
      email: basics.email ?? user.email ?? null,
      phone: basics.phone ?? null,
      location: isCustom ? null : (basics.location?.city ? `${basics.location.city}${basics.location?.region ? ', ' + basics.location.region : ''}${basics.location?.countryCode ? ', ' + basics.location.countryCode : ''}` : null),
      website: isCustom ? null : (basics.website ?? null),
      github: isCustom ? (socialGithub ?? null) : (socialGithub ?? null),
      linkedin: isCustom ? (socialLinkedin ?? null) : (socialLinkedin ?? null),
      avatar_url: isCustom ? null : (basics.image ?? null),
      resume_json: resume,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });

    // Replace experiences
    await supabase.from('experiences').delete().eq('user_id', user.id);
    const work: any[] = isCustom ? (Array.isArray(resume.work_experience) ? resume.work_experience.map((w: any) => ({
      name: w.company,
      position: w.title,
      startDate: (w.duration || '').split('–')[0]?.trim() || null,
      endDate: (w.duration || '').split('–')[1]?.trim() || null,
      summary: w.responsibilities?.join(' • ') || null,
      highlights: w.responsibilities || [],
      location: null,
    })) : []) : (Array.isArray(resume.work) ? resume.work : []);
    if (work.length) {
      await supabase.from('experiences').insert(work.map((w: any, i: number) => ({
        user_id: user.id,
        company: w.name ?? w.company ?? 'Company',
        position: w.position ?? w.title ?? 'Role',
        start_date: w.startDate ?? null,
        end_date: w.endDate ?? null,
        summary: w.summary ?? null,
        highlights: Array.isArray(w.highlights) ? w.highlights : [],
        location: w.location ?? null,
        order_index: i,
        updated_at: new Date().toISOString()
      })));
    }

    // Replace educations
    await supabase.from('educations').delete().eq('user_id', user.id);
    const education: any[] = isCustom ? (resume.education ? [{
      institution: resume.education.institution,
      area: null,
      studyType: resume.education.degree,
      startDate: null,
      endDate: (resume.education.year ? String(resume.education.year) : null),
      score: resume.education.cgpa ? `CGPA: ${resume.education.cgpa}` : null,
      courses: [],
    }] : []) : (Array.isArray(resume.education) ? resume.education : []);
    if (education.length) {
      await supabase.from('educations').insert(education.map((e: any, i: number) => ({
        user_id: user.id,
        institution: e.institution ?? e.name ?? 'Institution',
        area: e.area ?? null,
        study_type: e.studyType ?? null,
        start_date: e.startDate ?? null,
        end_date: e.endDate ?? null,
        score: e.score ?? null,
        courses: Array.isArray(e.courses) ? e.courses : [],
        order_index: i,
        updated_at: new Date().toISOString()
      })));
    }

    // Replace skills
    await supabase.from('skills').delete().eq('user_id', user.id);
    const skills: any[] = isCustom ? (() => {
      const sections = resume.skills || {};
      const groups: any[] = [];
      Object.entries(sections).forEach(([sectionName, arr]: any) => {
        if (Array.isArray(arr) && arr.length) {
          const title = String(sectionName)
            .replace(/_/g, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\b([a-z])/g, (_, c) => c.toUpperCase());
          groups.push({ name: title, keywords: arr.map((s: any) => String(s)), level: null });
        }
      });
      return groups;
    })() : (Array.isArray(resume.skills) ? resume.skills : []);
    if (skills.length) {
      await supabase.from('skills').insert(skills.map((s: any, i: number) => ({
        user_id: user.id,
        name: s.name ?? 'Skill',
        keywords: Array.isArray(s.keywords) ? s.keywords : [],
        level: s.level ?? null,
        order_index: i,
        updated_at: new Date().toISOString()
      })));
    }

    // Replace projects
    await supabase.from('projects').delete().eq('user_id', user.id);
    const projects: any[] = isCustom ? (Array.isArray(resume.projects) ? resume.projects.map((p: any) => ({
      name: p.name,
      description: [
        p.tech_stack ? `Tech: ${p.tech_stack.join(', ')}` : null,
        p.features ? `Features: ${p.features.join(', ')}` : null,
        p.impact ? `Impact: ${p.impact}` : null,
      ].filter(Boolean).join(' | '),
      url: null,
      highlights: [],
      keywords: p.tech_stack || [],
    })) : []) : (Array.isArray(resume.projects) ? resume.projects : []);
    if (projects.length) {
      await supabase.from('projects').insert(projects.map((p: any, i: number) => ({
        user_id: user.id,
        name: p.name ?? 'Project',
        description: p.description ?? null,
        url: p.url ?? null,
        highlights: Array.isArray(p.highlights) ? p.highlights : [],
        keywords: Array.isArray(p.keywords) ? p.keywords : [],
        order_index: i,
        updated_at: new Date().toISOString()
      })));
    }
  };

  // PDF Upload: Store in Supabase Storage 'resumes' bucket and save URL in profiles.resume_json.pdf_url
  const handleResumePdfFile = async (file: File) => {
    if (!file) return;
    if (!SUPABASE_AVAILABLE || !supabase) {
      setError('Backend not configured');
      return;
    }
    try {
      setResumePdfUploading(true);
      setError('');
      const userId = user?.id;
      if (!userId) throw new Error('Not authenticated');
      const path = `${userId}/resume.pdf`;
      // Upsert file (remove existing then upload to avoid duplicate error)
      await supabase.storage.from('resumes').remove([path]);
      const { error: uploadError } = await supabase.storage.from('resumes').upload(path, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: 'application/pdf'
      });
      if (uploadError) throw uploadError;
      const { data: pub } = supabase.storage.from('resumes').getPublicUrl(path);
      const pdfUrl = pub?.publicUrl ?? null;
      // Merge into profiles.resume_json
      const { data: existing } = await supabase.from('profiles').select('resume_json').eq('id', userId).maybeSingle();
      const resumeJson = existing?.resume_json || {};
      resumeJson.pdf_url = pdfUrl;
      await supabase.from('profiles').upsert({ id: userId, resume_json: resumeJson, updated_at: new Date().toISOString() }, { onConflict: 'id' });
      await refresh();
      setSuccess('Resume PDF uploaded and linked.');

      // Try to parse PDF into text and convert to JSON Resume via pdfjs-dist
      try {
        const arrayBuffer = await file.arrayBuffer();
        const resume = await extractJsonResumeFromPdf(arrayBuffer);
        if (resume) {
          await upsertProfileFromResume(resume);
          await refresh();
          setSuccess('Resume PDF parsed and site updated.');
        }
      } catch {}
    } catch (e: any) {
      setError(e?.message || 'Failed to upload PDF');
    } finally {
      setResumePdfUploading(false);
    }
  };

  // PDF.js-based extraction and heuristic mapping to JSON Resume
  const extractJsonResumeFromPdf = async (_arrayBuffer: ArrayBuffer): Promise<any | null> => {
    try {
      // PDF parsing temporarily disabled
      throw new Error('PDF parsing not available - please use JSON resume upload instead');
      
      /* Commented out until PDF.js import is fixed
      const pdfjsLib = await import('pdfjs-dist/build/pdf');
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer } as any);
      const pdf = await (loadingTask as any).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((it: any) => it.str);
        fullText += strings.join(' ') + '\n';
      }
      return mapPlainTextResumeToJson(fullText);
    } catch (e) {
      return null;
    }
  };

  const mapPlainTextResumeToJson = (text: string): any => {
    const norm = text.replace(/\r/g, ' ').replace(/\t/g, ' ').replace(/\s+/g, ' ').trim();

    const extract = (label: string) => {
      const idx = norm.toUpperCase().indexOf(label.toUpperCase());
      if (idx < 0) return '';
      const rest = norm.slice(idx + label.length);
      const nextIdx = ['PROFILE','WORK EXPERIENCE','SKILLS','PROJECTS','VOLUNTEER','EDUCATION','CERTIFICATIONS']
        .filter(h => h.toUpperCase() !== label.toUpperCase())
        .map(h => rest.toUpperCase().indexOf(h))
        .filter(i => i >= 0)
        .sort((a,b)=>a-b)[0];
      return nextIdx !== undefined ? rest.slice(0, nextIdx) : rest;
    };

    const profileSec = extract('PROFILE');
    const workSec = extract('WORK EXPERIENCE');
    const skillsSec = extract('SKILLS');
    const projectsSec = extract('PROJECTS');
    const educationSec = extract('EDUCATION');

    const basics: any = {};
    const emailMatch = norm.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const phoneMatch = norm.match(/\+?\d[\d\s\-]{7,}\d/);
    basics.email = emailMatch ? emailMatch[0] : null;
    basics.phone = phoneMatch ? phoneMatch[0] : null;
    // Name: first word(s) before PROFILE keyword
    const namePart = norm.split(/PROFILE/i)[0].trim();
    basics.name = namePart.split(' ').slice(0, 5).join(' ');
    basics.summary = profileSec ? profileSec.trim().slice(0, 1000) : null;

    // Work entries split by role bullets and separators
    const work: any[] = [];
    if (workSec) {
      // Split on role headers of the form " | " or date ranges
      const blocks = workSec.split(/(?= [A-Z][^|\n]{2,}\s*\|\s*[^\n]{2,})|(?=\d{4}\s*[–-]\s*\w+)/g).map(b => b.trim()).filter(Boolean);
      blocks.forEach(b => {
        const headerMatch = b.match(/^(.+?)\s*\|\s*(.+?)\s*(\d{4}[^\n]*)?/);
        const company = headerMatch?.[1]?.trim() || null;
        const position = headerMatch?.[2]?.trim() || null;
        const body = b.replace(/^.+?\n?/, '').trim();
        const highlights = body.split(/•|\u2022/).map(s => s.trim()).filter(s => s.length > 4).slice(0,10);
        if (company || position || highlights.length) {
          work.push({ name: company, position, summary: body, highlights });
        }
      });
    }

    // Skills: split by commas and bullets
    const skills: any[] = [];
    if (skillsSec) {
      const items = skillsSec.split(/,|•|\n/).map(s => s.trim()).filter(s => s.length > 1);
      const unique = Array.from(new Set(items)).slice(0, 100);
      if (unique.length) skills.push({ name: 'Skills', keywords: unique });
    }

    // Projects: split by double spaces with tech stack hints
    const projects: any[] = [];
    if (projectsSec) {
      const blocks = projectsSec.split(/(?= [A-Z][A-Za-z0-9 \-]{2,}\s*\|?\s*Live URL?)/i);
      blocks.forEach(b => {
        const title = b.split('|')[0]?.trim() || b.split('.')[0]?.trim();
        const description = b.trim();
        if (title && description) projects.push({ name: title, description });
      });
    }

    // Education: first sentence
    const education: any[] = [];
    if (educationSec) {
      const first = educationSec.split(/[\.|\n]/)[0]?.trim();
      if (first) education.push({ institution: first });
    }

    return { basics, work, education, skills, projects };
    */
    } catch (error) {
      console.error('PDF parsing error:', error);
      return null;
    }
  };

  // Deployment functions
  const fetchDeployments = async () => {
    if (!user) return;
    
    try {
      const userDeployments = await DeploymentService.getUserDeployments(user.id);
      setDeployments(userDeployments);
    } catch (error) {
      console.error('Error fetching deployments:', error);
    }
  };

  const handleGoLive = async () => {
    if (!user) return;
    
    setIsDeploying(true);
    setDeploymentError(null);
    
    try {
      // Get current profile data
      if (!supabase) throw new Error('Supabase not configured');
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profileData) {
        throw new Error('No profile data found. Please upload your resume first.');
      }

      const deployment = await DeploymentService.createDeployment({
        userId: user.id,
        profileData: profileData
      });

      setDeployments(prev => [deployment, ...prev]);
      setSuccess('Portfolio deployed! Your live portfolio is now available with the same React components as your main page.');
      
    } catch (error: any) {
      setDeploymentError(error.message || 'Failed to start deployment');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleDeleteAllDeployments = async () => {
    if (!user || !supabase) return;
    
    if (!confirm('Are you sure you want to delete all deployment history? This action cannot be undone.')) {
      return;
    }
    
    setIsDeletingAll(true);
    setError('');
    
    try {
      console.log('Deleting all deployments for user:', user.id);
      
      // First, let's check how many deployments exist
      const { data: existingDeployments, error: fetchError } = await supabase
        .from('deployments')
        .select('id')
        .eq('user_id', user.id);
      
      if (fetchError) {
        console.error('Error fetching existing deployments:', fetchError);
        throw fetchError;
      }
      
      console.log('Found deployments to delete:', existingDeployments?.length || 0);
      
      if (!existingDeployments || existingDeployments.length === 0) {
        setSuccess('No deployments found to delete.');
        return;
      }
      
      const { error, count } = await supabase
        .from('deployments')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }
      
      console.log('Deleted deployments count:', count);
      
      // Refresh deployments from database to ensure UI is updated
      await fetchDeployments();
      setSuccess(`All deployment history has been deleted. (${count || existingDeployments.length} deployments removed)`);
    } catch (error: any) {
      console.error('Error deleting deployments:', error);
      setError(error.message || 'Failed to delete deployments');
    } finally {
      setIsDeletingAll(false);
    }
  };

  // Polling function (not used in current implementation)
  // const pollDeploymentStatus = async (deploymentId: string) => {
  //   // ... implementation
  // };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage GitHub URLs</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <motion.button
                onClick={signOut}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Out
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 text-sm">{success}</span>
          </div>
        )}
            {/* Resume Upload */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Upload Resume</h2>
                  <p className="text-gray-600 text-sm">Upload JSON Resume to auto-fill data, or upload a PDF resume to store and link it.</p>
                </div>
                <div className="flex items-center gap-3">
                  <label
                    className={`px-4 py-2 rounded-xl font-semibold text-white ${resumeUploading ? 'bg-gray-400' : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'} cursor-pointer`}
                  >
                    <input
                      type="file"
                      accept="application/json,.json"
                      className="hidden"
                      disabled={resumeUploading}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleResumeFile(f);
                        e.currentTarget.value = '';
                      }}
                    />
                    {resumeUploading ? 'Processing...' : 'Upload JSON'}
                  </label>

                  <label
                    className={`px-4 py-2 rounded-xl font-semibold text-white ${resumePdfUploading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'} cursor-pointer`}
                  >
                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      disabled={resumePdfUploading}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleResumePdfFile(f);
                        e.currentTarget.value = '';
                      }}
                    />
                    {resumePdfUploading ? 'Uploading...' : 'Upload PDF'}
                  </label>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500">Formats: JSON Resume (jsonresume.org) and PDF (stored & linked).</div>
            </div>

        {/* GitHub Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">GitHub URLs</h2>
                  <p className="text-gray-600 text-sm">Manage your GitHub repository URLs for project display.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.button
                    onClick={async () => {
                      await refresh();
                      setSuccess('Profile data refreshed with latest GitHub information!');
                    }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Refresh Data
                  </motion.button>
          <motion.button
            onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
                    Add GitHub URL
          </motion.button>
                </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingUrl ? 'Edit GitHub URL' : 'Add New GitHub URL'}
              </h3>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="https://github.com/username/repository"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Brief description of the project"
                  rows={3}
                />
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                    {submitting ? 'Saving...' : (editingUrl ? 'Update URL' : 'Add URL')}
                </motion.button>
                
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* GitHub URLs List */}
          {loading ? (
            <div className="p-8 text-center">
              <Loader className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Loading URLs...</p>
            </div>
          ) : githubUrls.length === 0 ? (
            <div className="p-8 text-center">
              <Link className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No GitHub URLs added yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {githubUrls.map((url) => (
                <motion.div
                  key={url.id}
                  className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Github className="w-5 h-5 text-gray-400" />
                        <a
                          href={url.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium break-all"
                        >
                          {url.url}
                        </a>
                      </div>
                      
                      {url.description && (
                        <p className="text-gray-600 text-sm mb-2">{url.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(url.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>Admin</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <motion.button
                        onClick={() => handleEdit(url)}
                      className="px-3 py-1 text-gray-400 hover:text-blue-600 transition-colors text-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                      Edit
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleDelete(url.id)}
                      className="px-3 py-1 text-gray-400 hover:text-red-600 transition-colors text-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

            {/* Preview Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Preview Portfolio</h2>
                  <p className="text-gray-600 text-sm">Preview your portfolio with current GitHub data and resume before going live.</p>
                </div>
                <motion.a
                  href="/preview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Preview Portfolio</span>
                </motion.a>
              </div>
            </div>

            {/* Go Live Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Deploy Portfolio</h2>
                      <p className="text-gray-600 text-sm">Create a live portfolio URL using the same React components as your main page.</p>
                    </div>
                <motion.button
                  onClick={handleGoLive}
                  disabled={isDeploying || databaseReady === false}
                  className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-white ${
                    isDeploying || databaseReady === false
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                  }`}
                  whileHover={!isDeploying && databaseReady !== false ? { scale: 1.05 } : {}}
                  whileTap={!isDeploying && databaseReady !== false ? { scale: 0.95 } : {}}
                >
                  {isDeploying ? (
                    'Deploying...'
                  ) : databaseReady === false ? (
                    'Database Setup Required'
                  ) : (
                    'Go Live'
                  )}
                </motion.button>
              </div>

          {deploymentError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 text-sm">{deploymentError}</span>
            </div>
          )}

          {databaseReady === false && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h3 className="text-yellow-800 font-semibold mb-2">Database Setup Required</h3>
                  <p className="text-yellow-700 text-sm mb-3">
                    The deployments table needs to be created in your Supabase database.
                  </p>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <p className="text-yellow-800 text-sm font-mono">
                      1. Go to your Supabase SQL Editor<br/>
                      2. Run the SQL from <code>deployments-schema.sql</code><br/>
                      3. Refresh this page
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deployment Status */}
          {deployments.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium text-gray-900">Deployment History</h3>
                    <motion.button
                      onClick={handleDeleteAllDeployments}
                      disabled={isDeletingAll}
                      className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors ${
                        isDeletingAll 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                      whileHover={!isDeletingAll ? { scale: 1.05 } : {}}
                      whileTap={!isDeletingAll ? { scale: 0.95 } : {}}
                    >
                      {isDeletingAll ? 'Deleting...' : 'Delete All'}
                      </motion.button>
              </div>
              {deployments.map((deployment) => (
                <motion.div
                  key={deployment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      deployment.status === 'ready' ? 'bg-green-500' :
                      deployment.status === 'building' ? 'bg-yellow-500 animate-pulse' :
                      deployment.status === 'error' ? 'bg-red-500' :
                      'bg-gray-400'
                    }`} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 capitalize">{deployment.status}</span>
                        {deployment.status === 'building' && <Clock className="w-4 h-4 text-yellow-500" />}
                        {deployment.status === 'ready' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {deployment.status === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(deployment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                      {deployment.url && (
                        <motion.a
                          href={deployment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Live Portfolio
                        </motion.a>
                      )}
                  {deployment.status === 'ready' && !deployment.url && (
                    <motion.div
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                    >
                      Generating URL...
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;

import { useEffect } from 'react';
import { useProfile } from '../contexts/ProfileContext';

export const useSEO = () => {
  const { profile, githubUser } = useProfile();

  useEffect(() => {
    if (!profile && !githubUser) return;

    const fullName = profile?.fullName || githubUser?.name || 'Portfolio';
    const headline = profile?.headline || 'Professional Portfolio';
    const summary = profile?.summary || githubUser?.bio || 'Professional portfolio showcasing skills, experience, and projects.';
    const avatarUrl = profile?.avatarUrl || githubUser?.avatar_url || '/favicon.svg';
    const githubUrl = profile?.github || (githubUser?.login ? `https://github.com/${githubUser.login}` : '');
    const linkedinUrl = profile?.linkedin || '';

    // Update page title
    const title = `${fullName} - ${headline}`;
    document.title = title;
    updateMetaTag('page-title', title);
    updateMetaTag('og-title', title);
    updateMetaTag('twitter-title', title);

    // Update description
    const description = summary.length > 160 ? `${summary.substring(0, 160)}...` : summary;
    updateMetaTag('page-description', description);
    updateMetaTag('og-description', description);
    updateMetaTag('twitter-description', description);

    // Update image
    updateMetaTag('og-image', avatarUrl);
    updateMetaTag('twitter-image', avatarUrl);
    
    // Update additional meta tags
    updateMetaTag('og-url', window.location.href);
    updateMetaTag('og-site_name', `${fullName} Portfolio`);
    updateMetaTag('twitter-creator', githubUser?.twitter_username ? `@${githubUser.twitter_username}` : '');
    
    // Update author
    updateMetaTag('author', fullName);

    // Update structured data
    updateStructuredData({
      name: fullName,
      jobTitle: headline,
      description: summary,
      image: avatarUrl,
      githubUrl,
      linkedinUrl,
      email: profile?.email,
      phone: profile?.phone,
      location: profile?.location,
      skills: profile?.skills?.map(s => s.name) || [],
      experiences: profile?.experiences || [],
      educations: profile?.educations || [],
      certifications: profile?.certifications || []
    });

  }, [profile, githubUser]);

  const updateMetaTag = (id: string, content: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.setAttribute('content', content);
    }
  };

  const updateStructuredData = (data: any) => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": data.name,
      "jobTitle": data.jobTitle,
      "description": data.description,
      "url": window.location.href,
      "image": data.image,
      "email": data.email,
      "telephone": data.phone,
      "address": data.location ? {
        "@type": "PostalAddress",
        "addressLocality": data.location
      } : undefined,
      "sameAs": [
        data.githubUrl,
        data.linkedinUrl
      ].filter(Boolean),
      "knowsAbout": data.skills,
      "hasCredential": data.certifications ? data.certifications.map((cert: any) => ({
        "@type": "EducationalOccupationalCredential",
        "name": cert.name || cert,
        "credentialCategory": "certification"
      })) : [],
      "alumniOf": data.educations.length > 0 ? {
        "@type": "EducationalOrganization",
        "name": data.educations[0].institution
      } : undefined,
      "worksFor": data.experiences.length > 0 ? {
        "@type": "Organization",
        "name": data.experiences[0].company
      } : undefined
    };

    const script = document.getElementById('structured-data');
    if (script) {
      script.textContent = JSON.stringify(structuredData, null, 2);
    }
  };
};

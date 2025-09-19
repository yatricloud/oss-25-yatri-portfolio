import { useEffect } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { useGitHubProfile } from './useGitHubProfile';

export const useSEO = () => {
  const { profile } = useProfile();
  const { user } = useGitHubProfile();

  useEffect(() => {
    if (!profile && !user) return;

    const fullName = profile?.fullName || user?.name || 'Yatharth Chauhan';
    const headline = profile?.headline || 'Microsoft Azure Solution Architect & DevOps Expert';
    const summary = profile?.summary || user?.bio || 'Microsoft Azure Solution Architect & DevOps Expert | GitHub & CRM Enthusiast | 16x Microsoft Certified | Gold Microsoft Learn Student Ambassador';
    const avatarUrl = user?.avatar_url || 'https://avatars.githubusercontent.com/u/YatharthChauhan2362';
    const githubUrl = user?.login ? `https://github.com/${user.login}` : 'https://github.com/YatharthChauhan2362';
    const linkedinUrl = profile?.linkedin || 'https://linkedin.com/in/yatharthchauhan';

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
      educations: profile?.educations || []
    });

  }, [profile, user]);

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
      "url": "https://yatharthchauhan.com",
      "image": data.image,
      "email": data.email,
      "telephone": data.phone,
      "address": data.location ? {
        "@type": "PostalAddress",
        "addressLocality": data.location
      } : undefined,
      "sameAs": [
        data.githubUrl,
        data.linkedinUrl,
        "https://youtube.com/@YatriCloud"
      ].filter(Boolean),
      "knowsAbout": data.skills,
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Microsoft Azure Certified Expert Level",
          "credentialCategory": "certification"
        },
        {
          "@type": "EducationalOccupationalCredential", 
          "name": "GitHub Advanced Security",
          "credentialCategory": "certification"
        }
      ],
      "alumniOf": data.educations.length > 0 ? {
        "@type": "EducationalOrganization",
        "name": data.educations[0].institution
      } : {
        "@type": "EducationalOrganization",
        "name": "Charotar University of Science & Technology"
      },
      "worksFor": data.experiences.length > 0 ? {
        "@type": "Organization",
        "name": data.experiences[0].company
      } : {
        "@type": "Organization",
        "name": "Ascendion"
      }
    };

    const script = document.getElementById('structured-data');
    if (script) {
      script.textContent = JSON.stringify(structuredData, null, 2);
    }
  };
};

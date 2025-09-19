import { useEffect } from 'react';
import { FaviconGenerator } from '../utils/faviconGenerator';
import { useProfile } from '../contexts/ProfileContext';
import { useAuth } from '../contexts/AuthContext';
import { useGitHubProfile } from './useGitHubProfile';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Hook to manage dynamic favicon generation
 */
export const useDynamicFavicon = () => {
  const { profile } = useProfile();
  const { user: authUser } = useAuth();
  const { user: githubUser } = useGitHubProfile(authUser?.id);
  const { theme } = useTheme();

  useEffect(() => {
    const generateFavicon = async () => {
      try {
        // Use profile data if available, otherwise fallback to GitHub data
        const faviconData = {
          fullName: profile?.fullName || githubUser?.name || 'Portfolio',
          avatarUrl: profile?.avatarUrl || githubUser?.avatar_url,
          theme: theme
        };

        await FaviconGenerator.generateFromProfile(faviconData);
      } catch (error) {
        console.error('Failed to generate dynamic favicon:', error);
      }
    };

    // Generate favicon when profile, GitHub user, or theme changes
    if (profile || githubUser) {
      generateFavicon();
    }
  }, [profile, githubUser, theme]);

  // Return empty object since we only need automatic generation
  return {};
};

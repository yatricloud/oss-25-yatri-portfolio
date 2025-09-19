import { useEffect } from 'react';
import { FaviconGenerator } from '../utils/faviconGenerator';
import { useProfile } from '../contexts/ProfileContext';
import { useGitHubProfile } from './useGitHubProfile';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Hook to manage dynamic favicon generation
 */
export const useDynamicFavicon = () => {
  const { profile } = useProfile();
  const { user: githubUser } = useGitHubProfile();
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

    // Generate favicon when profile or theme changes
    if (profile || githubUser) {
      generateFavicon();
    }
  }, [profile, githubUser, theme]);

  return {
    generateFavicon: async (options?: {
      imageUrl?: string;
      text?: string;
      backgroundColor?: string;
      textColor?: string;
    }) => {
      try {
        let faviconDataUrl: string;

        if (options?.imageUrl) {
          if (options?.text) {
            faviconDataUrl = await FaviconGenerator.generateFromImageWithText(
              options.imageUrl,
              options.text,
              {
                backgroundColor: options.backgroundColor,
                textColor: options.textColor
              }
            );
          } else {
            faviconDataUrl = await FaviconGenerator.generateFromImage(options.imageUrl);
          }
        } else if (options?.text) {
          faviconDataUrl = FaviconGenerator.generateFromText(options.text, {
            backgroundColor: options.backgroundColor,
            textColor: options.textColor
          });
        } else {
          // Use current profile data
          const faviconData = {
            fullName: profile?.fullName || githubUser?.name || 'Portfolio',
            avatarUrl: profile?.avatarUrl || githubUser?.avatar_url,
            theme: theme
          };
          await FaviconGenerator.generateFromProfile(faviconData);
          return;
        }

        FaviconGenerator.setFavicon(faviconDataUrl);
      } catch (error) {
        console.error('Failed to generate custom favicon:', error);
      }
    }
  };
};

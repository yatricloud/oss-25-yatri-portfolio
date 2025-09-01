import { useState, useEffect } from 'react';
import { GitHubService, GitHubUser } from '../services/githubService';

export interface UseGitHubProfileReturn {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
}

export const useGitHubProfile = (): UseGitHubProfileReturn => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userProfile = await GitHubService.fetchUserProfile();
      setUser(userProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      console.error('Error in useGitHubProfile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return {
    user,
    loading,
    error,
    refreshProfile
  };
};

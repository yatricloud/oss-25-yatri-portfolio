import { useState, useEffect } from 'react';
import { GitHubService, ProcessedProject } from '../services/githubService';

export interface UseGitHubProjectsReturn {
  projects: ProcessedProject[];
  loading: boolean;
  error: string | null;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredProjects: ProcessedProject[];
  refreshProjects: () => Promise<void>;
  showMore: boolean;
  setShowMore: (show: boolean) => void;
  displayedProjects: ProcessedProject[];
  hasMoreProjects: boolean;
}

export const useGitHubProjects = (): UseGitHubProjectsReturn => {
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMore, setShowMore] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const repos = await GitHubService.fetchUserRepositories();
      const processedProjects = GitHubService.processRepositories(repos);
      
      setProjects(processedProjects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      console.error('Error in useGitHubProjects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Reset showMore when category changes
  useEffect(() => {
    setShowMore(false);
  }, [selectedCategory]);

  // Get unique categories from projects
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Limit displayed projects based on showMore state
  const displayedProjects = showMore ? filteredProjects : filteredProjects.slice(0, 6);
  const hasMoreProjects = filteredProjects.length > 6;

  const refreshProjects = async () => {
    await fetchProjects();
  };

  return {
    projects,
    loading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredProjects,
    refreshProjects,
    showMore,
    setShowMore,
    displayedProjects,
    hasMoreProjects
  };
};

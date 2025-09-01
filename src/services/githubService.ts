export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  archived: boolean;
  fork: boolean;
  size: number;
  visibility: string;
}

export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface ProcessedProject {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  liveUrl: string | null;
  githubUrl: string;
  featured: boolean;
  stars: number;
  forks: number;
  topics: string[];
  language: string | null;
  lastUpdated: string;
  gradient: string;
}

const GRADIENT_MAPPINGS: { [key: string]: string } = {
  'Python': 'from-green-500 to-emerald-500',
  'JavaScript': 'from-yellow-500 to-orange-500',
  'TypeScript': 'from-blue-500 to-indigo-500',
  'C++': 'from-purple-500 to-pink-500',
  'Java': 'from-red-500 to-pink-500',
  'Go': 'from-cyan-500 to-blue-500',
  'Rust': 'from-orange-500 to-red-500',
  'PHP': 'from-purple-500 to-indigo-500',
  'Ruby': 'from-red-500 to-pink-500',
  'Swift': 'from-orange-500 to-red-500',
  'Kotlin': 'from-purple-500 to-pink-500',
  'Dart': 'from-blue-500 to-cyan-500',
  'HTML': 'from-orange-500 to-red-500',
  'CSS': 'from-blue-500 to-cyan-500',
  'Shell': 'from-green-500 to-emerald-500',
  'Dockerfile': 'from-blue-500 to-indigo-500',
  'Makefile': 'from-gray-500 to-gray-700',
  'default': 'from-gray-500 to-gray-700'
};

const CATEGORY_MAPPINGS: { [key: string]: string } = {
  'ai': 'AI/ML',
  'machine-learning': 'AI/ML',
  'deep-learning': 'AI/ML',
  'nlp': 'AI/ML',
  'computer-vision': 'AI/ML',
  'tensorflow': 'AI/ML',
  'pytorch': 'AI/ML',
  'scikit-learn': 'AI/ML',
  'web': 'Web Apps',
  'web-app': 'Web Apps',
  'frontend': 'Web Apps',
  'backend': 'Web Apps',
  'fullstack': 'Web Apps',
  'react': 'Web Apps',
  'vue': 'Web Apps',
  'angular': 'Web Apps',
  'node': 'Web Apps',
  'mobile': 'Mobile',
  'android': 'Mobile',
  'ios': 'Mobile',
  'react-native': 'Mobile',
  'flutter': 'Mobile',
  'data': 'Data Science',
  'data-science': 'Data Science',
  'analytics': 'Data Science',
  'database': 'Data Science',
  'sql': 'Data Science',
  'nosql': 'Data Science',
  'devops': 'DevOps',
  'docker': 'DevOps',
  'kubernetes': 'DevOps',
  'ci-cd': 'DevOps',
  'automation': 'DevOps',
  'cloud': 'Cloud',
  'aws': 'Cloud',
  'azure': 'Cloud',
  'gcp': 'Cloud',
  'default': 'Other'
};

export class GitHubService {
  private static readonly GITHUB_API_BASE = 'https://api.github.com';
  private static readonly USERNAME = 'YatharthChauhan2362';

  static async fetchUserProfile(): Promise<GitHubUser | null> {
    try {
      const response = await fetch(
        `${this.GITHUB_API_BASE}/users/${this.USERNAME}`
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const user: GitHubUser = await response.json();
      return user;
    } catch (error) {
      console.error('Error fetching GitHub user profile:', error);
      return null;
    }
  }

  static async fetchUserRepositories(): Promise<GitHubRepo[]> {
    try {
      const response = await fetch(
        `${this.GITHUB_API_BASE}/users/${this.USERNAME}/repos?sort=updated&per_page=100&type=public`
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos: GitHubRepo[] = await response.json();
      
      // Filter out archived and forked repositories, and sort by stars
      return repos
        .filter(repo => !repo.archived && !repo.fork && repo.visibility === 'public')
        .sort((a, b) => b.stargazers_count - a.stargazers_count);
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      return [];
    }
  }

  static processRepositories(repos: GitHubRepo[]): ProcessedProject[] {
    return repos.map(repo => {
      const category = this.determineCategory(repo.topics, repo.language);
      const gradient = this.determineGradient(repo.language);
      
      return {
        id: repo.id,
        title: this.formatTitle(repo.name),
        category,
        description: repo.description || 'No description available',
        technologies: this.extractTechnologies(repo.topics, repo.language),
        liveUrl: repo.homepage || null,
        githubUrl: repo.html_url,
        featured: this.isFeatured(repo),
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics,
        language: repo.language,
        lastUpdated: repo.updated_at,
        gradient
      };
    });
  }

  private static determineCategory(topics: string[], language: string | null): string {
    if (topics.length > 0) {
      for (const topic of topics) {
        const category = CATEGORY_MAPPINGS[topic.toLowerCase()];
        if (category) return category;
      }
    }
    
    if (language) {
      const category = CATEGORY_MAPPINGS[language.toLowerCase()];
      if (category) return category;
    }
    
    return CATEGORY_MAPPINGS.default;
  }

  private static determineGradient(language: string | null): string {
    if (language && GRADIENT_MAPPINGS[language]) {
      return GRADIENT_MAPPINGS[language];
    }
    return GRADIENT_MAPPINGS.default;
  }

  private static formatTitle(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private static extractTechnologies(topics: string[], language: string | null): string[] {
    const techs = new Set<string>();
    
    if (language) {
      techs.add(language);
    }
    
    // Add relevant topics as technologies
    const relevantTopics = topics.filter(topic => 
      !['portfolio', 'website', 'blog', 'demo', 'example', 'template'].includes(topic.toLowerCase())
    );
    
    relevantTopics.forEach(topic => techs.add(topic));
    
    return Array.from(techs).slice(0, 6); // Limit to 6 technologies
  }

  private static isFeatured(repo: GitHubRepo): boolean {
    // Consider a repo featured if it has stars, is recent, or has specific topics
    return repo.stargazers_count > 0 || 
           repo.topics.includes('featured') ||
           repo.topics.includes('showcase') ||
           new Date(repo.updated_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Updated in last 30 days
  }
}

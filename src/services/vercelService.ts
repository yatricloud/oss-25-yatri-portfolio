import { VERCEL_CONFIG } from '../config/vercel';

export interface VercelProject {
  id: string;
  name: string;
  url: string;
  state: 'READY' | 'BUILDING' | 'ERROR';
}

export interface VercelDeployment {
  id: string;
  url: string;
  state: 'READY' | 'BUILDING' | 'ERROR';
  createdAt: number;
}

export class VercelService {
  private static readonly API_URL = VERCEL_CONFIG.API_URL;
  private static readonly TOKEN = VERCEL_CONFIG.TOKEN;
  private static readonly TEAM_ID = VERCEL_CONFIG.TEAM_ID;

  private static async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.API_URL}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Vercel API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  static async createProject(projectName: string, profileData: any): Promise<VercelProject> {
    try {
      console.log('Creating Vercel project:', projectName);
      
      // Create a new project
      const project = await this.makeRequest('/projects', {
        method: 'POST',
        body: JSON.stringify({
          name: projectName,
          framework: 'vite',
          gitRepository: {
            type: 'github',
            repo: 'yatricloud/portfolio-template', // Your template repo
            repoId: 123456789, // You'll need to get this from GitHub API
          },
          ...(this.TEAM_ID && { teamId: this.TEAM_ID })
        })
      });

      console.log('Project created:', project);

      // Create deployment
      const deployment = await this.createDeployment(project.id, profileData);
      
      return {
        id: project.id,
        name: project.name,
        url: `https://${project.name}.vercel.app`,
        state: 'BUILDING'
      };

    } catch (error) {
      console.error('Error creating Vercel project:', error);
      throw new Error('Failed to create Vercel project');
    }
  }

  static async createDeployment(projectId: string, profileData: any): Promise<VercelDeployment> {
    try {
      console.log('Creating deployment for project:', projectId);
      
      // For now, we'll create a simple deployment
      // In a real implementation, you'd upload the built files
      const deployment = await this.makeRequest(`/projects/${projectId}/deployments`, {
        method: 'POST',
        body: JSON.stringify({
          name: 'portfolio-deployment',
          target: 'production',
          ...(this.TEAM_ID && { teamId: this.TEAM_ID })
        })
      });

      console.log('Deployment created:', deployment);

      return {
        id: deployment.id,
        url: `https://${deployment.url}`,
        state: 'BUILDING',
        createdAt: Date.now()
      };

    } catch (error) {
      console.error('Error creating deployment:', error);
      throw new Error('Failed to create deployment');
    }
  }

  static async getProjectStatus(projectId: string): Promise<VercelProject> {
    try {
      const project = await this.makeRequest(`/projects/${projectId}`, {
        method: 'GET'
      });

      return {
        id: project.id,
        name: project.name,
        url: `https://${project.name}.vercel.app`,
        state: project.state || 'READY'
      };

    } catch (error) {
      console.error('Error fetching project status:', error);
      throw new Error('Failed to fetch project status');
    }
  }

  static async getDeploymentStatus(deploymentId: string): Promise<VercelDeployment> {
    try {
      const deployment = await this.makeRequest(`/deployments/${deploymentId}`, {
        method: 'GET'
      });

      return {
        id: deployment.id,
        url: `https://${deployment.url}`,
        state: deployment.state || 'READY',
        createdAt: deployment.createdAt
      };

    } catch (error) {
      console.error('Error fetching deployment status:', error);
      throw new Error('Failed to fetch deployment status');
    }
  }

  // Alternative approach: Create a simple static site deployment
  static async createStaticDeployment(profileData: any): Promise<{ url: string; deploymentId: string }> {
    try {
      // Generate a unique project name
      const projectName = `portfolio-${Date.now()}`;
      
      // For now, return a demo URL that you can replace with actual Vercel deployment
      // In production, this would create a real Vercel project
      const demoUrl = `https://${projectName}.vercel.app`;
      
      console.log('Creating static deployment:', demoUrl);
      
      // Simulate deployment creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return {
        url: demoUrl,
        deploymentId: `deploy_${Date.now()}`
      };

    } catch (error) {
      console.error('Error creating static deployment:', error);
      throw new Error('Failed to create static deployment');
    }
  }
}

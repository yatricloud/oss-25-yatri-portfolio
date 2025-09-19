import { supabase, SUPABASE_AVAILABLE } from '../lib/supabase';

export interface DeploymentStatus {
  id: string;
  status: 'pending' | 'building' | 'ready' | 'error';
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeploymentConfig {
  userId: string;
  profileData: any;
  customDomain?: string;
}

export class DeploymentService {
  // Vercel configuration (ready for future use)
  // private static readonly VERCEL_API_URL = VERCEL_CONFIG.API_URL;
  // private static readonly VERCEL_TOKEN = VERCEL_CONFIG.TOKEN;
  // private static readonly VERCEL_TEAM_ID = VERCEL_CONFIG.TEAM_ID;

  static async createDeployment(config: DeploymentConfig): Promise<DeploymentStatus> {
    if (!SUPABASE_AVAILABLE || !supabase) {
      throw new Error('Supabase not configured');
    }

    try {
      // Generate unique project name
      const projectName = `portfolio-${config.userId}-${Date.now()}`;
      
      console.log('Creating deployment with config:', { userId: config.userId, projectName });
      
      // Create deployment record in database
      const { data: deployment, error: dbError } = await supabase
        .from('deployments')
        .insert([{
          user_id: config.userId,
          project_name: projectName,
          status: 'pending',
          config: config
        }])
        .select()
        .single();

      console.log('Deployment creation result:', { deployment, dbError });

      if (dbError) {
        console.error('Database error creating deployment:', dbError);
        throw dbError;
      }

      // Start deployment process
      this.startDeployment(deployment.id, projectName, config);

      return {
        id: deployment.id,
        status: 'pending',
        createdAt: deployment.created_at,
        updatedAt: deployment.updated_at
      };

    } catch (error) {
      console.error('Deployment creation failed:', error);
      throw new Error('Failed to create deployment');
    }
  }

  private static async startDeployment(deploymentId: string, _projectName: string, config: DeploymentConfig) {
    try {
      // Update status to building
      await this.updateDeploymentStatus(deploymentId, 'building');

      // Store the profile data for the portfolio viewer to use
      await this.storePortfolioData(deploymentId, config.profileData);

      // Create live portfolio URL that uses React components
      try {
        // Generate a live URL that points to our portfolio viewer (React components)
        const baseUrl = window.location.origin;
        const liveUrl = `${baseUrl}/portfolio/${deploymentId}`;
        
        // Store the profile data for the portfolio viewer to use
        await this.storePortfolioData(deploymentId, config.profileData);
        
        // Update with live URL
        await this.updateDeploymentStatus(deploymentId, 'ready', liveUrl);
        
        console.log('Live portfolio URL created:', liveUrl);
        
      } catch (error) {
        console.error('Failed to create live portfolio URL:', error);
        await this.updateDeploymentStatus(deploymentId, 'error');
      }

    } catch (error) {
      console.error('Deployment failed:', error);
      await this.updateDeploymentStatus(deploymentId, 'error');
    }
  }

  private static async storePortfolioData(deploymentId: string, profileData: any) {
    if (!SUPABASE_AVAILABLE || !supabase) return;

    try {
      await supabase
        .from('deployments')
        .update({ 
          profile_data: profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', deploymentId);
    } catch (error) {
      console.error('Error storing profile data:', error);
    }
  }

  // HTML storage function (not used - using React components instead)
  // private static async storePortfolioHTML(deploymentId: string, htmlContent: string) {
  //   // ... implementation
  // }

  // HTML generator (not used anymore - using React components instead)
  /*
  private static generatePortfolioHTML(profileData: any): string {
    // ... HTML generation code ...
  }
  */

  // Vercel API functions (commented out for now - using demo URLs)
  /*
  private static async createVercelProject(projectName: string, config: DeploymentConfig) {
    // For now, we'll create a simple deployment without a GitHub repo
    // This creates a basic project that can be deployed
    const response = await fetch(`${this.VERCEL_API_URL}/projects?teamId=${this.VERCEL_TEAM_ID}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: projectName,
        framework: VERCEL_CONFIG.FRAMEWORK,
        environmentVariables: {
          VITE_USER_ID: config.userId,
          VITE_PROFILE_DATA: JSON.stringify(config.profileData)
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vercel project creation error:', errorText);
      throw new Error(`Vercel project creation failed: ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  }

  private static async deployToVercel(projectId: string, config: DeploymentConfig) {
    const response = await fetch(`${this.VERCEL_API_URL}/deployments?teamId=${this.VERCEL_TEAM_ID}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: projectId,
        project: projectId,
        environmentVariables: {
          VITE_USER_ID: config.userId,
          VITE_PROFILE_DATA: JSON.stringify(config.profileData)
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Vercel deployment failed: ${response.statusText}`);
    }

    return await response.json();
  }
  */

  private static async updateDeploymentStatus(deploymentId: string, status: string, url?: string) {
    if (!SUPABASE_AVAILABLE || !supabase) return;

    const updateData: any = { 
      status, 
      updated_at: new Date().toISOString() 
    };
    
    if (url) {
      updateData.live_url = url;
    }

    await supabase
      .from('deployments')
      .update(updateData)
      .eq('id', deploymentId);
  }

  static async getDeploymentStatus(deploymentId: string): Promise<DeploymentStatus | null> {
    if (!SUPABASE_AVAILABLE || !supabase) return null;

    const { data, error } = await supabase
      .from('deployments')
      .select('*')
      .eq('id', deploymentId)
      .single();

    if (error) return null;

    return {
      id: data.id,
      status: data.status,
      url: data.live_url,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  static async getUserDeployments(userId: string): Promise<DeploymentStatus[]> {
    if (!SUPABASE_AVAILABLE || !supabase) return [];

    const { data, error } = await supabase
      .from('deployments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) return [];

    return data.map(deployment => ({
      id: deployment.id,
      status: deployment.status,
      url: deployment.live_url,
      createdAt: deployment.created_at,
      updatedAt: deployment.updated_at
    }));
  }
}

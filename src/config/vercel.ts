// Vercel Configuration
export const VERCEL_CONFIG = {
  API_URL: 'https://api.vercel.com/v1',
  TOKEN: import.meta.env.VITE_VERCEL_TOKEN || '',
  TEAM_ID: import.meta.env.VITE_VERCEL_TEAM_ID || '',
  TEMPLATE_REPO: import.meta.env.VITE_VERCEL_TEMPLATE_REPO || 'yatricloud/portfolio-template',
  FRAMEWORK: 'vite'
} as const;

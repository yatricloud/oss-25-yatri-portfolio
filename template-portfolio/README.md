# Portfolio Template

This is a template repository for live portfolio deployments.

## Environment Variables

The template expects these environment variables:
- `VITE_USER_ID`: User ID from the main application
- `VITE_PROFILE_DATA`: JSON string of user's profile data

## How It Works

1. User clicks "Go Live" in admin dashboard
2. System creates Vercel project from this template
3. Injects user's profile data as environment variables
4. Deploys the portfolio with user's data
5. Generates public URL for sharing

## Template Structure

```
template-portfolio/
├── src/
│   ├── components/
│   ├── contexts/
│   └── main.tsx
├── package.json
├── vite.config.ts
└── README.md
```

## Customization

The template should:
- Read `VITE_PROFILE_DATA` environment variable
- Parse JSON data and populate portfolio
- Display user's information dynamically
- Be responsive and SEO-optimized

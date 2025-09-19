# Live Portfolio Deployment Setup

This guide explains how to set up the live portfolio deployment feature.

## 🚀 How It Works

1. **User clicks "Go Live"** in admin dashboard
2. **System creates deployment** with unique URL
3. **Portfolio builds** with user's data
4. **Live URL generated** for public access

## 📋 Prerequisites

### 1. Vercel Account & API Token
- Sign up at [vercel.com](https://vercel.com)
- Go to Settings → Tokens
- Create new token with full access
- Add to `.env`:
```bash
VITE_VERCEL_TOKEN=your_vercel_token_here
VITE_VERCEL_TEAM_ID=your_team_id_here
```

### 2. Database Setup
Run the SQL schema in your Supabase project:
```sql
-- Copy and run deployments-schema.sql
```

### 3. Template Repository
- Create a GitHub repo with your portfolio template
- Update `deploymentService.ts` with your repo URL
- Template should accept environment variables:
  - `VITE_USER_ID`
  - `VITE_PROFILE_DATA`

## 🔧 Configuration

### Environment Variables
```bash
# Vercel API
VITE_VERCEL_TOKEN=vercel_xxx
VITE_VERCEL_TEAM_ID=team_xxx

# Supabase (existing)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Template Repository Structure
```
portfolio-template/
├── src/
│   ├── components/
│   ├── contexts/
│   └── main.tsx
├── package.json
├── vite.config.ts
└── README.md
```

## 🎯 Features

### ✅ What's Included
- **One-click deployment** from admin panel
- **Real-time status** updates (pending → building → ready)
- **Live URL generation** with custom subdomain
- **Deployment history** tracking
- **Error handling** and retry logic
- **Public access** to live portfolios

### 🔄 Deployment Flow
1. User uploads resume data
2. Clicks "Go Live" button
3. System creates Vercel project
4. Deploys with user's data
5. Generates public URL
6. User can share live portfolio

## 🛠️ Customization

### Custom Domain (Optional)
- Add domain field to deployment config
- Update Vercel project with custom domain
- Handle DNS configuration

### Template Customization
- Modify template to use environment variables
- Add user-specific styling
- Include dynamic content from profile data

## 📊 Monitoring

### Deployment Status
- **Pending**: Just created
- **Building**: Vercel is building
- **Ready**: Live and accessible
- **Error**: Build failed

### Error Handling
- Invalid profile data
- Vercel API limits
- Build failures
- Network issues

## 🚀 Usage

1. **Login** to admin panel
2. **Upload resume** (JSON or PDF)
3. **Click "Go Live"** button
4. **Wait** for deployment (2-5 minutes)
5. **Share** the live URL

## 🔒 Security

- **User isolation**: Each user gets unique URL
- **Data privacy**: Only public profile data exposed
- **Access control**: Admin-only deployment access
- **Rate limiting**: Prevents abuse

## 💡 Tips

- **Test first**: Use small profile data for testing
- **Monitor usage**: Track Vercel API limits
- **Backup data**: Keep profile data in Supabase
- **Update template**: Keep template repo updated

## 🆘 Troubleshooting

### Common Issues
1. **"No profile data found"**
   - Upload resume first
   - Check profile data in Supabase

2. **"Vercel API error"**
   - Check API token
   - Verify team ID
   - Check rate limits

3. **"Build failed"**
   - Check template repository
   - Verify environment variables
   - Check Vercel logs

### Support
- Check Vercel dashboard for build logs
- Monitor Supabase for data issues
- Review browser console for errors

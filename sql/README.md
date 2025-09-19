# Yatri Portfolio - Database Setup

This folder contains all the SQL scripts needed to set up the Yatri Portfolio database from scratch in Supabase.

## 📋 Setup Order

Run these SQL files in the following order in your Supabase SQL Editor:

### 1. Core Tables
```sql
-- Run this first
01-core-tables.sql
```
This creates all the main tables:
- `admin_users` - Admin user management
- `github_urls` - GitHub repository URLs
- `profiles` - Main profile information
- `experiences` - Work experience data
- `educations` - Education data
- `skills` - Skills data
- `projects` - Projects data
- `contact_messages` - Contact form submissions

### 2. Deployments Table
```sql
-- Run this second
02-deployments-table.sql
```
This creates the deployments table for live portfolio management.

### 3. Storage Setup
```sql
-- Run this third
03-storage-setup.sql
```
This sets up Supabase Storage for file uploads (resume PDFs).

### 4. Sample Data (Optional)
```sql
-- Run this fourth (optional)
04-sample-data.sql
```
This contains sample data for testing. **Uncomment and modify the data as needed.**

### 5. Functions and Triggers
```sql
-- Run this last
05-functions-and-triggers.sql
```
This creates utility functions, triggers, and views.

## 🚀 Quick Setup

1. **Open Supabase Dashboard**
   - Go to your Supabase project
   - Navigate to SQL Editor

2. **Run the Scripts**
   - Copy and paste each SQL file content
   - Run them in order (01 → 02 → 03 → 04 → 05)

3. **Verify Setup**
   - Check that all tables are created
   - Verify RLS policies are enabled
   - Test with sample data (optional)

## 📊 Database Schema Overview

### Core Tables
- **profiles** - Main profile information from resume uploads
- **experiences** - Work experience entries
- **educations** - Education entries
- **skills** - Skills with categories and keywords
- **projects** - Project portfolio entries
- **contact_messages** - Contact form submissions
- **github_urls** - GitHub repository URLs for project fetching
- **admin_users** - Admin user management
- **deployments** - Live portfolio deployment management

### Key Features
- ✅ **Row Level Security (RLS)** enabled on all tables
- ✅ **Public read access** for portfolio data
- ✅ **Authenticated write access** for data management
- ✅ **Automatic admin creation** on user signup
- ✅ **File storage** for resume PDFs
- ✅ **Deployment management** for live portfolios
- ✅ **Performance indexes** on key columns
- ✅ **Update triggers** for timestamps

## 🔧 Environment Variables

After setting up the database, make sure to configure these environment variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Usage

### For Users
1. **Sign up** - Automatically becomes admin
2. **Upload resume** - JSON or PDF format
3. **Add GitHub URLs** - For project fetching
4. **Deploy portfolio** - Create live URL

### For Developers
- All data is publicly readable for portfolio display
- Admin functions require authentication
- Contact form submissions are stored securely
- File uploads use Supabase Storage

## 🛠️ Troubleshooting

### Common Issues

1. **RLS Policies Not Working**
   - Ensure policies are created correctly
   - Check user authentication status
   - Verify policy conditions

2. **Storage Upload Fails**
   - Check bucket permissions
   - Verify storage policies
   - Ensure file size limits

3. **Functions Not Found**
   - Run `05-functions-and-triggers.sql`
   - Check function permissions
   - Verify function signatures

### Reset Database
If you need to start over:
```sql
-- Drop all tables (be careful!)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
-- Then run all scripts again
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Setup Guide](https://supabase.com/docs/guides/storage)

## 🤝 Support

If you encounter any issues:
1. Check the Supabase logs
2. Verify all scripts ran successfully
3. Test with sample data
4. Check environment variables

---

**Happy coding! 🚀**

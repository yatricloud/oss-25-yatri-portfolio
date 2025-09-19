# 🚀 Yatri Portfolio - Complete Database Setup

This folder contains everything you need to set up the Yatri Portfolio database from scratch in Supabase.

## 📁 Files Overview

| File | Description | When to Use |
|------|-------------|-------------|
| `00-complete-setup.sql` | **All-in-one setup** - Everything in one file | **Recommended for quick setup** |
| `01-core-tables.sql` | Core database tables | Step-by-step setup |
| `02-deployments-table.sql` | Deployments table | Step-by-step setup |
| `03-storage-setup.sql` | File storage setup | Step-by-step setup |
| `04-sample-data.sql` | Sample data for testing | Optional |
| `05-functions-and-triggers.sql` | Utility functions | Step-by-step setup |
| `README.md` | Detailed documentation | Reference |
| `SETUP_INSTRUCTIONS.md` | This file | Quick start guide |

## ⚡ Quick Setup (Recommended)

### Option 1: One-File Setup
1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy and paste the entire content of `00-complete-setup.sql`
4. Click **Run**
5. ✅ Done! Your database is ready.

### Option 2: Step-by-Step Setup
If you prefer to run files individually:

1. Run `01-core-tables.sql`
2. Run `02-deployments-table.sql`
3. Run `03-storage-setup.sql`
4. Run `05-functions-and-triggers.sql`
5. (Optional) Run `04-sample-data.sql` with modifications

## 🔧 Environment Variables

After database setup, configure these in your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 What Gets Created

### Tables
- ✅ `admin_users` - Admin user management
- ✅ `github_urls` - GitHub repository URLs
- ✅ `profiles` - Main profile information
- ✅ `experiences` - Work experience data
- ✅ `educations` - Education data
- ✅ `skills` - Skills with categories
- ✅ `projects` - Project portfolio
- ✅ `contact_messages` - Contact form submissions
- ✅ `deployments` - Live portfolio deployments

### Features
- ✅ **Row Level Security (RLS)** on all tables
- ✅ **Public read access** for portfolio display
- ✅ **Authenticated write access** for data management
- ✅ **Automatic admin creation** on user signup
- ✅ **File storage** for resume PDFs
- ✅ **Performance indexes** on key columns
- ✅ **Update triggers** for timestamps
- ✅ **Utility functions** for data access

## 🎯 Next Steps

1. **Start the Application**
   ```bash
   npm install
   npm run dev
   ```

2. **Sign Up for Admin Access**
   - Go to `/login`
   - Sign up with your email
   - You'll automatically become an admin

3. **Upload Your Resume**
   - Upload JSON Resume or PDF
   - Data will populate automatically

4. **Add GitHub URLs**
   - Add your GitHub profile/repositories
   - Projects will be fetched automatically

5. **Deploy Live Portfolio**
   - Click "Go Live" in admin dashboard
   - Get your live portfolio URL

## 🛠️ Troubleshooting

### Common Issues

**❌ "Table doesn't exist"**
- Make sure you ran the complete setup
- Check that all scripts executed successfully

**❌ "Permission denied"**
- Verify RLS policies are created
- Check user authentication status

**❌ "Storage upload fails"**
- Ensure storage bucket is created
- Check storage policies

**❌ "Functions not found"**
- Run `05-functions-and-triggers.sql`
- Check function permissions

### Reset Database
If you need to start over:
```sql
-- ⚠️ WARNING: This will delete all data!
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
-- Then run the setup again
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Setup Guide](https://supabase.com/docs/guides/storage)

## 🆘 Need Help?

1. Check the Supabase logs in your dashboard
2. Verify all environment variables are set
3. Test with sample data first
4. Check the detailed `README.md` for more information

---

**🎉 You're all set! Happy coding!**

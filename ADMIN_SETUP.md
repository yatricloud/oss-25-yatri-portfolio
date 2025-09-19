# Admin Panel Setup Guide

This guide will help you set up the admin panel with Supabase authentication and GitHub URL management.

## 🚀 Quick Setup

### 1. Environment Variables

The `.env` file has been created with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://fvtrienulcbocuzmtsll.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2dHJpZW51bGNib2N1em10c2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MzAzNTcsImV4cCI6MjA3MjEwNjM1N30.mJmWOeT7Nltae204QzrkRShrA5Ix-7BX7lmdZgEkPxo
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2dHJpZW51bGNib2N1em10c2xsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjUzMDM1NywiZXhwIjoyMDcyMTA2MzU3fQ.rhTrJ7WvR7-rFl0HlO-mlnrWbqUvRp_on3Evahssmn8
```

### 2. Supabase Database Setup

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard/project/fvtrienulcbocuzmtsll
2. **Navigate to SQL Editor**
3. **Run the SQL script**: Copy and paste the contents of `supabase-setup.sql` and execute it

### 3. Create Admin User

#### Option A: Using Supabase Dashboard
1. Go to **Authentication > Users** in your Supabase dashboard
2. Click **"Add User"**
3. Enter the admin email and password
4. After creating the user, go to **SQL Editor**
5. Run this command (replace with actual user ID and email):

```sql
SELECT create_admin_user('USER_ID_HERE', 'admin@example.com');
```

#### Option B: Using Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref fvtrienulcbocuzmtsll

# Create admin user via SQL
supabase db reset
```

### 4. Test the Admin Panel

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the admin panel**:
   ```
   http://localhost:5173/login
   ```

3. **Login with your admin credentials**

## 🔧 Features

### Admin Panel Features:
- **Secure Authentication**: Supabase Auth with email/password
- **Admin-Only Access**: Only users in `admin_users` table can access
- **GitHub URL Management**: Add, edit, delete GitHub URLs
- **Real-time Updates**: Changes reflect immediately
- **Responsive Design**: Works on all devices
- **Beautiful UI**: Modern design with animations

### Security Features:
- **Row Level Security (RLS)**: Database-level security policies
- **Admin Role Verification**: Checks admin status on every request
- **Secure API Keys**: Environment variables for sensitive data
- **Input Validation**: Form validation and sanitization

## 📋 Database Schema

### `admin_users` Table
```sql
- id: UUID (references auth.users)
- email: TEXT
- role: TEXT (default: 'admin')
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `github_urls` Table
```sql
- id: UUID (primary key)
- url: TEXT (GitHub URL)
- description: TEXT (optional)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- created_by: UUID (references auth.users)
```

## 🔐 Security Policies

### Row Level Security (RLS):
- **admin_users**: Only admins can view, only service role can modify
- **github_urls**: Anyone can view, only admins can modify

### Authentication Flow:
1. User logs in with email/password
2. System checks if user exists in `admin_users` table
3. If yes, grants admin access
4. If no, shows "Access Denied"

## 🚀 Usage

### Adding GitHub URLs:
1. Login to `/login`
2. Click "Add GitHub URL"
3. Enter the GitHub repository URL
4. Add optional description
5. Click "Add URL"

### Managing URLs:
- **Edit**: Click the edit icon next to any URL
- **Delete**: Click the trash icon (with confirmation)
- **View**: All URLs are displayed in a clean list

## 🔧 Troubleshooting

### Common Issues:

1. **"Access Denied" Error**:
   - Make sure the user exists in `admin_users` table
   - Check if the user has `role = 'admin'`

2. **Database Connection Error**:
   - Verify environment variables are correct
   - Check Supabase project status

3. **RLS Policy Errors**:
   - Ensure all SQL from `supabase-setup.sql` was executed
   - Check that RLS is enabled on tables

### Debug Steps:
1. Check browser console for errors
2. Verify Supabase connection in Network tab
3. Check Supabase logs in dashboard
4. Test database queries in SQL Editor

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Supabase configuration
3. Ensure all SQL scripts were executed successfully
4. Test with a fresh admin user account

## 🔄 Updates

The admin panel will automatically:
- Check authentication status
- Verify admin privileges
- Update GitHub URLs in real-time
- Handle loading and error states

---

**Admin Panel URL**: `http://localhost:5173/login` (or your deployed domain)
**Supabase Project**: https://supabase.com/dashboard/project/fvtrienulcbocuzmtsll

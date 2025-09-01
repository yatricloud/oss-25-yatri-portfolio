-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create github_urls table
CREATE TABLE IF NOT EXISTS github_urls (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS on tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_urls ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_github_urls_created_at ON github_urls(created_at);
CREATE INDEX IF NOT EXISTS idx_github_urls_created_by ON github_urls(created_by);

-- RLS Policies for admin_users table
-- Only admins can view admin_users
CREATE POLICY "Admins can view admin_users" ON admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.id = auth.uid() AND au.role = 'admin'
        )
    );

-- Only service role can insert/update admin_users (for security)
CREATE POLICY "Service role can manage admin_users" ON admin_users
    FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for github_urls table
-- Anyone can view github_urls (for public access)
CREATE POLICY "Anyone can view github_urls" ON github_urls
    FOR SELECT USING (true);

-- Only admins can insert github_urls
CREATE POLICY "Admins can insert github_urls" ON github_urls
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.id = auth.uid() AND au.role = 'admin'
        )
    );

-- Only admins can update github_urls
CREATE POLICY "Admins can update github_urls" ON github_urls
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.id = auth.uid() AND au.role = 'admin'
        )
    );

-- Only admins can delete github_urls
CREATE POLICY "Admins can delete github_urls" ON github_urls
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.id = auth.uid() AND au.role = 'admin'
        )
    );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_github_urls_updated_at 
    BEFORE UPDATE ON github_urls 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create admin_user record when a user signs up
-- This should be called manually from the Supabase dashboard or API
CREATE OR REPLACE FUNCTION create_admin_user(user_id UUID, user_email TEXT)
RETURNS VOID AS $$
BEGIN
    INSERT INTO admin_users (id, email, role)
    VALUES (user_id, user_email, 'admin')
    ON CONFLICT (id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON admin_users TO anon, authenticated;
GRANT ALL ON github_urls TO anon, authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Comments for documentation
COMMENT ON TABLE admin_users IS 'Table to store admin user information';
COMMENT ON TABLE github_urls IS 'Table to store GitHub URLs managed by admins';
COMMENT ON FUNCTION create_admin_user IS 'Function to create admin user record - should be called manually';

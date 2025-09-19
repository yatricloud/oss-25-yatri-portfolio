-- Add the missing profile_data column to the deployments table
ALTER TABLE public.deployments 
ADD COLUMN IF NOT EXISTS profile_data jsonb;

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'deployments' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Add the missing html_content column to the deployments table
ALTER TABLE public.deployments 
ADD COLUMN IF NOT EXISTS html_content text;

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'deployments' 
AND table_schema = 'public'
ORDER BY ordinal_position;

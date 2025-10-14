-- Add user_id column to track submission ownership
ALTER TABLE merchant_submissions 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can submit merchant form" ON merchant_submissions;
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON merchant_submissions;

-- Create policy for users to submit their own forms
CREATE POLICY "Users can submit own forms" 
ON merchant_submissions 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to view only their own submissions
CREATE POLICY "Users can view own submissions" 
ON merchant_submissions 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Create policy for users to update their own submissions
CREATE POLICY "Users can update own submissions" 
ON merchant_submissions 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to delete their own submissions
CREATE POLICY "Users can delete own submissions" 
ON merchant_submissions 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);
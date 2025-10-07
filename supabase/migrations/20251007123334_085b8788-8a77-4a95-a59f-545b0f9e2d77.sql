-- Create merchant_submissions table
CREATE TABLE public.merchant_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  business_email TEXT NOT NULL,
  business_address TEXT NOT NULL,
  federal_tax_id TEXT NOT NULL,
  corporation_date DATE NOT NULL,
  business_type TEXT NOT NULL,
  country TEXT NOT NULL,
  state_province TEXT NOT NULL,
  city TEXT NOT NULL,
  zip_postal_code TEXT NOT NULL,
  business_description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.merchant_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit merchant form" 
ON public.merchant_submissions 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view submissions
CREATE POLICY "Authenticated users can view submissions" 
ON public.merchant_submissions 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX idx_merchant_submissions_country ON public.merchant_submissions(country);
CREATE INDEX idx_merchant_submissions_created_at ON public.merchant_submissions(created_at DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_merchant_submissions_updated_at
BEFORE UPDATE ON public.merchant_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
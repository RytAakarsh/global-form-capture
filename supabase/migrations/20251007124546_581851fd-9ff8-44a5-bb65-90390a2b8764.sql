-- Add Business Ownership fields to merchant_submissions table
ALTER TABLE public.merchant_submissions 
ADD COLUMN owner_name TEXT,
ADD COLUMN owner_home_address TEXT,
ADD COLUMN owner_passport TEXT,
ADD COLUMN ownership_percentage TEXT,
ADD COLUMN owner_home_city TEXT,
ADD COLUMN owner_passport_2 TEXT,
ADD COLUMN owner_date_of_birth DATE,
ADD COLUMN owner_phone_number TEXT,
ADD COLUMN owner_home_zip_postal_code TEXT,
ADD COLUMN owner_dl TEXT,
ADD COLUMN owner_skype_id TEXT,
ADD COLUMN owner_home_country TEXT,
ADD COLUMN owner_dl_state_country TEXT,
ADD COLUMN has_co_owner BOOLEAN DEFAULT false,

-- Add Bank Information fields to merchant_submissions table
ADD COLUMN bank_name TEXT,
ADD COLUMN settlement_transit_aba TEXT,
ADD COLUMN bank_swift TEXT,
ADD COLUMN deposit_account TEXT,
ADD COLUMN confirm_deposit_account TEXT,
ADD COLUMN account_type TEXT,
ADD COLUMN customer_service_no TEXT,
ADD COLUMN web_address TEXT,
ADD COLUMN bank_contact_email TEXT;
-- Add additional employee fields for employment history and emergency contact
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS previous_employer text,
ADD COLUMN IF NOT EXISTS previous_company_name text,
ADD COLUMN IF NOT EXISTS previous_company_address text,
ADD COLUMN IF NOT EXISTS contact_number text,
ADD COLUMN IF NOT EXISTS employment_details text,
ADD COLUMN IF NOT EXISTS immediate_supervisor text,
ADD COLUMN IF NOT EXISTS emergency_contact_address text;
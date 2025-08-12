
-- Add new columns to the employees table for additional information
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS employee_number TEXT,
ADD COLUMN IF NOT EXISTS home_address TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_relation TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT;

-- Create a unique constraint on employee_number to prevent duplicates
ALTER TABLE public.employees 
ADD CONSTRAINT unique_employee_number UNIQUE (employee_number);

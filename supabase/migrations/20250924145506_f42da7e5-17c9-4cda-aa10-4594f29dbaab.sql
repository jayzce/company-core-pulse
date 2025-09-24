-- Add comprehensive employee information fields
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS tin_number text,
ADD COLUMN IF NOT EXISTS hdmf_number text,
ADD COLUMN IF NOT EXISTS philhealth_number text,
ADD COLUMN IF NOT EXISTS sss_number text,
ADD COLUMN IF NOT EXISTS course text,
ADD COLUMN IF NOT EXISTS school text,
ADD COLUMN IF NOT EXISTS year_attended_from integer,
ADD COLUMN IF NOT EXISTS year_attended_to integer,
ADD COLUMN IF NOT EXISTS employer_1_company_name text,
ADD COLUMN IF NOT EXISTS employer_1_company_address text,
ADD COLUMN IF NOT EXISTS employer_1_contact_number text,
ADD COLUMN IF NOT EXISTS employer_1_position text,
ADD COLUMN IF NOT EXISTS employer_1_employment_from date,
ADD COLUMN IF NOT EXISTS employer_1_employment_to date,
ADD COLUMN IF NOT EXISTS employer_1_supervisor_name text,
ADD COLUMN IF NOT EXISTS employer_1_supervisor_contact text,
ADD COLUMN IF NOT EXISTS employer_1_reason_leaving text,
ADD COLUMN IF NOT EXISTS employer_2_company_name text,
ADD COLUMN IF NOT EXISTS employer_2_company_address text,
ADD COLUMN IF NOT EXISTS employer_2_contact_number text,
ADD COLUMN IF NOT EXISTS employer_2_position text,
ADD COLUMN IF NOT EXISTS employer_2_employment_from date,
ADD COLUMN IF NOT EXISTS employer_2_employment_to date,
ADD COLUMN IF NOT EXISTS employer_2_supervisor_name text,
ADD COLUMN IF NOT EXISTS employer_2_supervisor_contact text,
ADD COLUMN IF NOT EXISTS employer_2_reason_leaving text,
ADD COLUMN IF NOT EXISTS employer_3_company_name text,
ADD COLUMN IF NOT EXISTS employer_3_company_address text,
ADD COLUMN IF NOT EXISTS employer_3_contact_number text,
ADD COLUMN IF NOT EXISTS employer_3_position text,
ADD COLUMN IF NOT EXISTS employer_3_employment_from date,
ADD COLUMN IF NOT EXISTS employer_3_employment_to date,
ADD COLUMN IF NOT EXISTS employer_3_supervisor_name text,
ADD COLUMN IF NOT EXISTS employer_3_supervisor_contact text,
ADD COLUMN IF NOT EXISTS employer_3_reason_leaving text,
ADD COLUMN IF NOT EXISTS emergency_contact_email text;

-- Create hiring process tables for tracking
CREATE TABLE IF NOT EXISTS public.applicants (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  contact_number text,
  position_applied text NOT NULL,
  application_date timestamp with time zone DEFAULT now(),
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.job_offers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  applicant_id uuid REFERENCES public.applicants(id),
  position text NOT NULL,
  salary_offered numeric,
  offer_date timestamp with time zone DEFAULT now(),
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.onboarding (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id uuid REFERENCES public.employees(id),
  start_date date,
  completion_date date,
  status text DEFAULT 'pending',
  tasks_completed integer DEFAULT 0,
  total_tasks integer DEFAULT 10,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.regularization (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id uuid REFERENCES public.employees(id),
  probation_start_date date,
  probation_end_date date,
  evaluation_score numeric,
  status text DEFAULT 'pending',
  regularization_date date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regularization ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins and managers can manage applicants" ON public.applicants FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = ANY (ARRAY['admin'::text, 'manager'::text])));
CREATE POLICY "Admins and managers can manage job offers" ON public.job_offers FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = ANY (ARRAY['admin'::text, 'manager'::text])));
CREATE POLICY "Admins and managers can manage onboarding" ON public.onboarding FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = ANY (ARRAY['admin'::text, 'manager'::text])));
CREATE POLICY "Admins and managers can manage regularization" ON public.regularization FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = ANY (ARRAY['admin'::text, 'manager'::text])));

-- Add triggers for updated_at
CREATE TRIGGER update_applicants_updated_at BEFORE UPDATE ON public.applicants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_job_offers_updated_at BEFORE UPDATE ON public.job_offers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_onboarding_updated_at BEFORE UPDATE ON public.onboarding FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_regularization_updated_at BEFORE UPDATE ON public.regularization FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
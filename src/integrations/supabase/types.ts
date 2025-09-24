export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      applicants: {
        Row: {
          application_date: string | null
          contact_number: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          position_applied: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          application_date?: string | null
          contact_number?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          position_applied: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          application_date?: string | null
          contact_number?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          position_applied?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      attendance: {
        Row: {
          break_end: string | null
          break_start: string | null
          created_at: string | null
          date: string
          employee_id: string | null
          hours_worked: number | null
          id: string
          notes: string | null
          overtime_hours: number | null
          status: string | null
          time_in: string | null
          time_out: string | null
          updated_at: string | null
        }
        Insert: {
          break_end?: string | null
          break_start?: string | null
          created_at?: string | null
          date: string
          employee_id?: string | null
          hours_worked?: number | null
          id?: string
          notes?: string | null
          overtime_hours?: number | null
          status?: string | null
          time_in?: string | null
          time_out?: string | null
          updated_at?: string | null
        }
        Update: {
          break_end?: string | null
          break_start?: string | null
          created_at?: string | null
          date?: string
          employee_id?: string | null
          hours_worked?: number | null
          id?: string
          notes?: string | null
          overtime_hours?: number | null
          status?: string | null
          time_in?: string | null
          time_out?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          contact_number: string | null
          course: string | null
          created_at: string | null
          date_of_birth: string | null
          department: string
          email: string
          emergency_contact_address: string | null
          emergency_contact_email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relation: string | null
          employee_id: string
          employee_number: string | null
          employer_1_company_address: string | null
          employer_1_company_name: string | null
          employer_1_contact_number: string | null
          employer_1_employment_from: string | null
          employer_1_employment_to: string | null
          employer_1_position: string | null
          employer_1_reason_leaving: string | null
          employer_1_supervisor_contact: string | null
          employer_1_supervisor_name: string | null
          employer_2_company_address: string | null
          employer_2_company_name: string | null
          employer_2_contact_number: string | null
          employer_2_employment_from: string | null
          employer_2_employment_to: string | null
          employer_2_position: string | null
          employer_2_reason_leaving: string | null
          employer_2_supervisor_contact: string | null
          employer_2_supervisor_name: string | null
          employer_3_company_address: string | null
          employer_3_company_name: string | null
          employer_3_contact_number: string | null
          employer_3_employment_from: string | null
          employer_3_employment_to: string | null
          employer_3_position: string | null
          employer_3_reason_leaving: string | null
          employer_3_supervisor_contact: string | null
          employer_3_supervisor_name: string | null
          employment_details: string | null
          first_name: string
          hdmf_number: string | null
          hire_date: string
          home_address: string | null
          id: string
          immediate_supervisor: string | null
          last_name: string
          philhealth_number: string | null
          position: string
          previous_company_address: string | null
          previous_company_name: string | null
          previous_employer: string | null
          profile_id: string | null
          salary: number
          school: string | null
          sss_number: string | null
          status: string | null
          tin_number: string | null
          updated_at: string | null
          year_attended_from: number | null
          year_attended_to: number | null
        }
        Insert: {
          contact_number?: string | null
          course?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department: string
          email: string
          emergency_contact_address?: string | null
          emergency_contact_email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          employee_id: string
          employee_number?: string | null
          employer_1_company_address?: string | null
          employer_1_company_name?: string | null
          employer_1_contact_number?: string | null
          employer_1_employment_from?: string | null
          employer_1_employment_to?: string | null
          employer_1_position?: string | null
          employer_1_reason_leaving?: string | null
          employer_1_supervisor_contact?: string | null
          employer_1_supervisor_name?: string | null
          employer_2_company_address?: string | null
          employer_2_company_name?: string | null
          employer_2_contact_number?: string | null
          employer_2_employment_from?: string | null
          employer_2_employment_to?: string | null
          employer_2_position?: string | null
          employer_2_reason_leaving?: string | null
          employer_2_supervisor_contact?: string | null
          employer_2_supervisor_name?: string | null
          employer_3_company_address?: string | null
          employer_3_company_name?: string | null
          employer_3_contact_number?: string | null
          employer_3_employment_from?: string | null
          employer_3_employment_to?: string | null
          employer_3_position?: string | null
          employer_3_reason_leaving?: string | null
          employer_3_supervisor_contact?: string | null
          employer_3_supervisor_name?: string | null
          employment_details?: string | null
          first_name: string
          hdmf_number?: string | null
          hire_date: string
          home_address?: string | null
          id?: string
          immediate_supervisor?: string | null
          last_name: string
          philhealth_number?: string | null
          position: string
          previous_company_address?: string | null
          previous_company_name?: string | null
          previous_employer?: string | null
          profile_id?: string | null
          salary: number
          school?: string | null
          sss_number?: string | null
          status?: string | null
          tin_number?: string | null
          updated_at?: string | null
          year_attended_from?: number | null
          year_attended_to?: number | null
        }
        Update: {
          contact_number?: string | null
          course?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string
          email?: string
          emergency_contact_address?: string | null
          emergency_contact_email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          employee_id?: string
          employee_number?: string | null
          employer_1_company_address?: string | null
          employer_1_company_name?: string | null
          employer_1_contact_number?: string | null
          employer_1_employment_from?: string | null
          employer_1_employment_to?: string | null
          employer_1_position?: string | null
          employer_1_reason_leaving?: string | null
          employer_1_supervisor_contact?: string | null
          employer_1_supervisor_name?: string | null
          employer_2_company_address?: string | null
          employer_2_company_name?: string | null
          employer_2_contact_number?: string | null
          employer_2_employment_from?: string | null
          employer_2_employment_to?: string | null
          employer_2_position?: string | null
          employer_2_reason_leaving?: string | null
          employer_2_supervisor_contact?: string | null
          employer_2_supervisor_name?: string | null
          employer_3_company_address?: string | null
          employer_3_company_name?: string | null
          employer_3_contact_number?: string | null
          employer_3_employment_from?: string | null
          employer_3_employment_to?: string | null
          employer_3_position?: string | null
          employer_3_reason_leaving?: string | null
          employer_3_supervisor_contact?: string | null
          employer_3_supervisor_name?: string | null
          employment_details?: string | null
          first_name?: string
          hdmf_number?: string | null
          hire_date?: string
          home_address?: string | null
          id?: string
          immediate_supervisor?: string | null
          last_name?: string
          philhealth_number?: string | null
          position?: string
          previous_company_address?: string | null
          previous_company_name?: string | null
          previous_employer?: string | null
          profile_id?: string | null
          salary?: number
          school?: string | null
          sss_number?: string | null
          status?: string | null
          tin_number?: string | null
          updated_at?: string | null
          year_attended_from?: number | null
          year_attended_to?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_offers: {
        Row: {
          applicant_id: string | null
          created_at: string | null
          id: string
          offer_date: string | null
          position: string
          salary_offered: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applicant_id?: string | null
          created_at?: string | null
          id?: string
          offer_date?: string | null
          position: string
          salary_offered?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string | null
          created_at?: string | null
          id?: string
          offer_date?: string | null
          position?: string
          salary_offered?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_offers_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicants"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          days_requested: number
          employee_id: string | null
          end_date: string
          id: string
          leave_type: string
          reason: string | null
          rejection_reason: string | null
          start_date: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          days_requested: number
          employee_id?: string | null
          end_date: string
          id?: string
          leave_type: string
          reason?: string | null
          rejection_reason?: string | null
          start_date: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          days_requested?: number
          employee_id?: string | null
          end_date?: string
          id?: string
          leave_type?: string
          reason?: string | null
          rejection_reason?: string | null
          start_date?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding: {
        Row: {
          completion_date: string | null
          created_at: string | null
          employee_id: string | null
          id: string
          start_date: string | null
          status: string | null
          tasks_completed: number | null
          total_tasks: number | null
          updated_at: string | null
        }
        Insert: {
          completion_date?: string | null
          created_at?: string | null
          employee_id?: string | null
          id?: string
          start_date?: string | null
          status?: string | null
          tasks_completed?: number | null
          total_tasks?: number | null
          updated_at?: string | null
        }
        Update: {
          completion_date?: string | null
          created_at?: string | null
          employee_id?: string | null
          id?: string
          start_date?: string | null
          status?: string | null
          tasks_completed?: number | null
          total_tasks?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll: {
        Row: {
          allowances: number | null
          basic_salary: number
          created_at: string | null
          deductions: number | null
          employee_id: string | null
          id: string
          net_pay: number
          overtime_pay: number | null
          pagibig_contribution: number | null
          pay_period_end: string
          pay_period_start: string
          philhealth_contribution: number | null
          processed_at: string | null
          sss_contribution: number | null
          status: string | null
          tax_withheld: number | null
          updated_at: string | null
        }
        Insert: {
          allowances?: number | null
          basic_salary: number
          created_at?: string | null
          deductions?: number | null
          employee_id?: string | null
          id?: string
          net_pay: number
          overtime_pay?: number | null
          pagibig_contribution?: number | null
          pay_period_end: string
          pay_period_start: string
          philhealth_contribution?: number | null
          processed_at?: string | null
          sss_contribution?: number | null
          status?: string | null
          tax_withheld?: number | null
          updated_at?: string | null
        }
        Update: {
          allowances?: number | null
          basic_salary?: number
          created_at?: string | null
          deductions?: number | null
          employee_id?: string | null
          id?: string
          net_pay?: number
          overtime_pay?: number | null
          pagibig_contribution?: number | null
          pay_period_end?: string
          pay_period_start?: string
          philhealth_contribution?: number | null
          processed_at?: string | null
          sss_contribution?: number | null
          status?: string | null
          tax_withheld?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payroll_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          department: string | null
          email: string
          first_name: string | null
          hire_date: string | null
          id: string
          last_name: string | null
          position: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email: string
          first_name?: string | null
          hire_date?: string | null
          id: string
          last_name?: string | null
          position?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string
          first_name?: string | null
          hire_date?: string | null
          id?: string
          last_name?: string | null
          position?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      regularization: {
        Row: {
          created_at: string | null
          employee_id: string | null
          evaluation_score: number | null
          id: string
          probation_end_date: string | null
          probation_start_date: string | null
          regularization_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          employee_id?: string | null
          evaluation_score?: number | null
          id?: string
          probation_end_date?: string | null
          probation_start_date?: string | null
          regularization_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          employee_id?: string | null
          evaluation_score?: number | null
          id?: string
          probation_end_date?: string | null
          probation_start_date?: string | null
          regularization_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regularization_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

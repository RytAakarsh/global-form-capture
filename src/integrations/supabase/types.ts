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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      merchant_submissions: {
        Row: {
          account_type: string | null
          bank_contact_email: string | null
          bank_name: string | null
          bank_swift: string | null
          business_address: string
          business_description: string
          business_email: string
          business_name: string
          business_type: string
          city: string
          confirm_deposit_account: string | null
          corporation_date: string
          country: string
          created_at: string
          customer_service_no: string | null
          deposit_account: string | null
          federal_tax_id: string
          has_co_owner: boolean | null
          id: string
          owner_date_of_birth: string | null
          owner_dl: string | null
          owner_dl_state_country: string | null
          owner_home_address: string | null
          owner_home_city: string | null
          owner_home_country: string | null
          owner_home_zip_postal_code: string | null
          owner_name: string | null
          owner_passport: string | null
          owner_passport_2: string | null
          owner_phone_number: string | null
          owner_skype_id: string | null
          ownership_percentage: string | null
          settlement_transit_aba: string | null
          state_province: string
          updated_at: string
          user_id: string | null
          web_address: string | null
          zip_postal_code: string
        }
        Insert: {
          account_type?: string | null
          bank_contact_email?: string | null
          bank_name?: string | null
          bank_swift?: string | null
          business_address: string
          business_description: string
          business_email: string
          business_name: string
          business_type: string
          city: string
          confirm_deposit_account?: string | null
          corporation_date: string
          country: string
          created_at?: string
          customer_service_no?: string | null
          deposit_account?: string | null
          federal_tax_id: string
          has_co_owner?: boolean | null
          id?: string
          owner_date_of_birth?: string | null
          owner_dl?: string | null
          owner_dl_state_country?: string | null
          owner_home_address?: string | null
          owner_home_city?: string | null
          owner_home_country?: string | null
          owner_home_zip_postal_code?: string | null
          owner_name?: string | null
          owner_passport?: string | null
          owner_passport_2?: string | null
          owner_phone_number?: string | null
          owner_skype_id?: string | null
          ownership_percentage?: string | null
          settlement_transit_aba?: string | null
          state_province: string
          updated_at?: string
          user_id?: string | null
          web_address?: string | null
          zip_postal_code: string
        }
        Update: {
          account_type?: string | null
          bank_contact_email?: string | null
          bank_name?: string | null
          bank_swift?: string | null
          business_address?: string
          business_description?: string
          business_email?: string
          business_name?: string
          business_type?: string
          city?: string
          confirm_deposit_account?: string | null
          corporation_date?: string
          country?: string
          created_at?: string
          customer_service_no?: string | null
          deposit_account?: string | null
          federal_tax_id?: string
          has_co_owner?: boolean | null
          id?: string
          owner_date_of_birth?: string | null
          owner_dl?: string | null
          owner_dl_state_country?: string | null
          owner_home_address?: string | null
          owner_home_city?: string | null
          owner_home_country?: string | null
          owner_home_zip_postal_code?: string | null
          owner_name?: string | null
          owner_passport?: string | null
          owner_passport_2?: string | null
          owner_phone_number?: string | null
          owner_skype_id?: string | null
          ownership_percentage?: string | null
          settlement_transit_aba?: string | null
          state_province?: string
          updated_at?: string
          user_id?: string | null
          web_address?: string | null
          zip_postal_code?: string
        }
        Relationships: []
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

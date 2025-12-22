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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          backup_codes: string[] | null
          created_at: string
          display_name: string | null
          email: string
          failed_login_attempts: number | null
          id: string
          last_login: string | null
          locked_until: string | null
          totp_enabled: boolean | null
          totp_secret: string | null
          trusted_devices: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string
          display_name?: string | null
          email: string
          failed_login_attempts?: number | null
          id?: string
          last_login?: string | null
          locked_until?: string | null
          totp_enabled?: boolean | null
          totp_secret?: string | null
          trusted_devices?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string
          display_name?: string | null
          email?: string
          failed_login_attempts?: number | null
          id?: string
          last_login?: string | null
          locked_until?: string | null
          totp_enabled?: boolean | null
          totp_secret?: string | null
          trusted_devices?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      admin_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      appointments: {
        Row: {
          created_at: string
          customer_id: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          inquiry_id: string | null
          location: string | null
          notes: string | null
          reminder_sent: boolean | null
          scheduled_at: string
          service_type: string | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          inquiry_id?: string | null
          location?: string | null
          notes?: string | null
          reminder_sent?: boolean | null
          scheduled_at: string
          service_type?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          inquiry_id?: string | null
          location?: string | null
          notes?: string | null
          reminder_sent?: boolean | null
          scheduled_at?: string
          service_type?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          city: string | null
          company_name: string | null
          created_at: string
          customer_number: string | null
          customer_type: Database["public"]["Enums"]["inquiry_type"] | null
          email: string | null
          first_name: string | null
          id: string
          inquiry_count: number | null
          last_inquiry_at: string | null
          last_name: string
          notes: string | null
          phone: string | null
          street: string | null
          tags: string[] | null
          total_revenue: number | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          city?: string | null
          company_name?: string | null
          created_at?: string
          customer_number?: string | null
          customer_type?: Database["public"]["Enums"]["inquiry_type"] | null
          email?: string | null
          first_name?: string | null
          id?: string
          inquiry_count?: number | null
          last_inquiry_at?: string | null
          last_name: string
          notes?: string | null
          phone?: string | null
          street?: string | null
          tags?: string[] | null
          total_revenue?: number | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          city?: string | null
          company_name?: string | null
          created_at?: string
          customer_number?: string | null
          customer_type?: Database["public"]["Enums"]["inquiry_type"] | null
          email?: string | null
          first_name?: string | null
          id?: string
          inquiry_count?: number | null
          last_inquiry_at?: string | null
          last_name?: string
          notes?: string | null
          phone?: string | null
          street?: string | null
          tags?: string[] | null
          total_revenue?: number | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          customer_id: string | null
          email: string
          id: string
          inquiry_type: Database["public"]["Enums"]["inquiry_type"] | null
          internal_notes: string | null
          message: string
          name: string
          phone: string | null
          priority: Database["public"]["Enums"]["inquiry_priority"] | null
          source: string | null
          status: Database["public"]["Enums"]["inquiry_status"] | null
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          email: string
          id?: string
          inquiry_type?: Database["public"]["Enums"]["inquiry_type"] | null
          internal_notes?: string | null
          message: string
          name: string
          phone?: string | null
          priority?: Database["public"]["Enums"]["inquiry_priority"] | null
          source?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"] | null
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          email?: string
          id?: string
          inquiry_type?: Database["public"]["Enums"]["inquiry_type"] | null
          internal_notes?: string | null
          message?: string
          name?: string
          phone?: string | null
          priority?: Database["public"]["Enums"]["inquiry_priority"] | null
          source?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"] | null
          subject?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          created_at: string
          description: string
          discount_percent: number | null
          id: string
          invoice_id: string
          position: number | null
          quantity: number | null
          service_id: string | null
          total: number
          unit: string | null
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          discount_percent?: number | null
          id?: string
          invoice_id: string
          position?: number | null
          quantity?: number | null
          service_id?: string | null
          total: number
          unit?: string | null
          unit_price: number
        }
        Update: {
          created_at?: string
          description?: string
          discount_percent?: number | null
          id?: string
          invoice_id?: string
          position?: number | null
          quantity?: number | null
          service_id?: string | null
          total?: number
          unit?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "service_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string
          customer_id: string | null
          delivery_date: string | null
          discount_amount: number | null
          discount_percent: number | null
          due_date: string | null
          id: string
          invoice_date: string
          invoice_number: string
          notes: string | null
          paid_amount: number | null
          paid_at: string | null
          payment_method: string | null
          payment_terms: string | null
          quote_id: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["invoice_status"] | null
          subtotal: number | null
          total: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          delivery_date?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number: string
          notes?: string | null
          paid_amount?: number | null
          paid_at?: string | null
          payment_method?: string | null
          payment_terms?: string | null
          quote_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal?: number | null
          total?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          delivery_date?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          notes?: string | null
          paid_amount?: number | null
          paid_at?: string | null
          payment_method?: string | null
          payment_terms?: string | null
          quote_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal?: number | null
          total?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_items: {
        Row: {
          created_at: string
          description: string
          discount_percent: number | null
          id: string
          position: number | null
          quantity: number | null
          quote_id: string
          service_id: string | null
          total: number
          unit: string | null
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          discount_percent?: number | null
          id?: string
          position?: number | null
          quantity?: number | null
          quote_id: string
          service_id?: string | null
          total: number
          unit?: string | null
          unit_price: number
        }
        Update: {
          created_at?: string
          description?: string
          discount_percent?: number | null
          id?: string
          position?: number | null
          quantity?: number | null
          quote_id?: string
          service_id?: string | null
          total?: number
          unit?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "service_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          accepted_at: string | null
          created_at: string
          customer_id: string | null
          discount_amount: number | null
          discount_percent: number | null
          id: string
          inquiry_id: string | null
          notes: string | null
          quote_date: string
          quote_number: string
          sent_at: string | null
          status: Database["public"]["Enums"]["quote_status"] | null
          subtotal: number | null
          terms: string | null
          total: number | null
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          customer_id?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          id?: string
          inquiry_id?: string | null
          notes?: string | null
          quote_date?: string
          quote_number: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"] | null
          subtotal?: number | null
          terms?: string | null
          total?: number | null
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          customer_id?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          id?: string
          inquiry_id?: string | null
          notes?: string | null
          quote_date?: string
          quote_number?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"] | null
          subtotal?: number | null
          terms?: string | null
          total?: number | null
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      service_catalog: {
        Row: {
          category: string | null
          created_at: string
          default_price: number | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          sort_order: number | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          default_price?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          sort_order?: number | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          default_price?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          sort_order?: number | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      website_projects: {
        Row: {
          budget_range: string | null
          checklist: Json | null
          created_at: string
          customer_id: string | null
          domain: string | null
          features: string[] | null
          go_live_date: string | null
          id: string
          industry: string | null
          inquiry_id: string | null
          notes: string | null
          package_type: string | null
          project_name: string
          quote_id: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          updated_at: string
        }
        Insert: {
          budget_range?: string | null
          checklist?: Json | null
          created_at?: string
          customer_id?: string | null
          domain?: string | null
          features?: string[] | null
          go_live_date?: string | null
          id?: string
          industry?: string | null
          inquiry_id?: string | null
          notes?: string | null
          package_type?: string | null
          project_name: string
          quote_id?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string
        }
        Update: {
          budget_range?: string | null
          checklist?: Json | null
          created_at?: string
          customer_id?: string | null
          domain?: string | null
          features?: string[] | null
          go_live_date?: string | null
          id?: string
          industry?: string | null
          inquiry_id?: string | null
          notes?: string | null
          package_type?: string | null
          project_name?: string
          quote_id?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_projects_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_projects_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "inquiries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_projects_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_next_number: { Args: { sequence_type: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      appointment_status: "ausstehend" | "bestaetigt" | "abgesagt" | "erledigt"
      inquiry_priority: "normal" | "hoch" | "dringend"
      inquiry_status:
        | "neu"
        | "in_bearbeitung"
        | "angebot_erstellt"
        | "beantwortet"
        | "erledigt"
        | "archiviert"
      inquiry_type: "privat" | "business" | "website"
      invoice_status:
        | "entwurf"
        | "versendet"
        | "bezahlt"
        | "ueberfaellig"
        | "storniert"
      project_status:
        | "anfrage"
        | "angebot"
        | "anzahlung"
        | "umsetzung"
        | "review"
        | "live"
        | "wartung"
      quote_status:
        | "entwurf"
        | "versendet"
        | "angenommen"
        | "abgelehnt"
        | "rechnung_erstellt"
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
    Enums: {
      app_role: ["admin", "user"],
      appointment_status: ["ausstehend", "bestaetigt", "abgesagt", "erledigt"],
      inquiry_priority: ["normal", "hoch", "dringend"],
      inquiry_status: [
        "neu",
        "in_bearbeitung",
        "angebot_erstellt",
        "beantwortet",
        "erledigt",
        "archiviert",
      ],
      inquiry_type: ["privat", "business", "website"],
      invoice_status: [
        "entwurf",
        "versendet",
        "bezahlt",
        "ueberfaellig",
        "storniert",
      ],
      project_status: [
        "anfrage",
        "angebot",
        "anzahlung",
        "umsetzung",
        "review",
        "live",
        "wartung",
      ],
      quote_status: [
        "entwurf",
        "versendet",
        "angenommen",
        "abgelehnt",
        "rechnung_erstellt",
      ],
    },
  },
} as const

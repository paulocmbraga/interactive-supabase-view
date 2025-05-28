export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alunos: {
        Row: {
          aluno_id: number
          created_at: string
          email: string | null
          idade: string | null
          nome: string | null
          plano_ativo: boolean | null
          telefone: string | null
          yupchat_id: string | null
        }
        Insert: {
          aluno_id?: number
          created_at?: string
          email?: string | null
          idade?: string | null
          nome?: string | null
          plano_ativo?: boolean | null
          telefone?: string | null
          yupchat_id?: string | null
        }
        Update: {
          aluno_id?: number
          created_at?: string
          email?: string | null
          idade?: string | null
          nome?: string | null
          plano_ativo?: boolean | null
          telefone?: string | null
          yupchat_id?: string | null
        }
        Relationships: []
      }
      anamnese: {
        Row: {
          altura: number | null
          aluno_id: number | null
          anamnese_id: number
          created_at: string
          idade: number | null
          pergunta1: string | null
          pergunta2: string | null
          pergunta3: string | null
          pergunta4: string | null
          pergunta5: string | null
          peso: number | null
          score: number | null
        }
        Insert: {
          altura?: number | null
          aluno_id?: number | null
          anamnese_id?: number
          created_at?: string
          idade?: number | null
          pergunta1?: string | null
          pergunta2?: string | null
          pergunta3?: string | null
          pergunta4?: string | null
          pergunta5?: string | null
          peso?: number | null
          score?: number | null
        }
        Update: {
          altura?: number | null
          aluno_id?: number | null
          anamnese_id?: number
          created_at?: string
          idade?: number | null
          pergunta1?: string | null
          pergunta2?: string | null
          pergunta3?: string | null
          pergunta4?: string | null
          pergunta5?: string | null
          peso?: number | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "anamnese_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["aluno_id"]
          },
        ]
      }
      descricao_treinamentos_rag: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      faq_weburn_rag: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      log_view: {
        Row: {
          aluno_id: number | null
          created_at: string
          data_acesso: string | null
          dias_desde_cadastro: number | null
          log_view_id: number
          nome_aluno: string | null
          nome_curso: string | null
          nome_licao: string | null
          nome_modulo: string | null
          plano_ativo: boolean | null
          professor: string | null
          telefone_aluno: string | null
        }
        Insert: {
          aluno_id?: number | null
          created_at?: string
          data_acesso?: string | null
          dias_desde_cadastro?: number | null
          log_view_id?: number
          nome_aluno?: string | null
          nome_curso?: string | null
          nome_licao?: string | null
          nome_modulo?: string | null
          plano_ativo?: boolean | null
          professor?: string | null
          telefone_aluno?: string | null
        }
        Update: {
          aluno_id?: number | null
          created_at?: string
          data_acesso?: string | null
          dias_desde_cadastro?: number | null
          log_view_id?: number
          nome_aluno?: string | null
          nome_curso?: string | null
          nome_licao?: string | null
          nome_modulo?: string | null
          plano_ativo?: boolean | null
          professor?: string | null
          telefone_aluno?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "log_view_aluno_id_fkey"
            columns: ["aluno_id"]
            isOneToOne: false
            referencedRelation: "alunos"
            referencedColumns: ["aluno_id"]
          },
        ]
      }
      n8n_chat_histories: {
        Row: {
          followup: number | null
          id: number
          message: Json
          session_id: string
          timestamptz: string | null
        }
        Insert: {
          followup?: number | null
          id?: number
          message: Json
          session_id: string
          timestamptz?: string | null
        }
        Update: {
          followup?: number | null
          id?: number
          message?: Json
          session_id?: string
          timestamptz?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      latest_chat_per_session: {
        Row: {
          followup: number | null
          id: number | null
          last_interaction: string | null
          max_followup: number | null
          message: Json | null
          session_id: string | null
          ultimo_followup: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_descricao_treinamentos_rag: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      match_faq_weburn_rag: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

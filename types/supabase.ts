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
      blog: {
        Row: {
          blog_description: string | null
          blog_detail: string | null
          blog_id: string
          blog_image: string | null
          blog_likes_count: number | null
          blog_name: string | null
          blog_post_date: string | null
          blog_post_time: string | null
          category_id: string
          is_recommended: boolean | null
          organization_id: string
          publish: boolean | null
          user_id: string
        }
        Insert: {
          blog_description?: string | null
          blog_detail?: string | null
          blog_id: string
          blog_image?: string | null
          blog_likes_count?: number | null
          blog_name?: string | null
          blog_post_date?: string | null
          blog_post_time?: string | null
          category_id: string
          is_recommended?: boolean | null
          organization_id: string
          publish?: boolean | null
          user_id: string
        }
        Update: {
          blog_description?: string | null
          blog_detail?: string | null
          blog_id?: string
          blog_image?: string | null
          blog_likes_count?: number | null
          blog_name?: string | null
          blog_post_date?: string | null
          blog_post_time?: string | null
          category_id?: string
          is_recommended?: boolean | null
          organization_id?: string
          publish?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["organization_id"]
          },
        ]
      }
      blog_comment: {
        Row: {
          blog_id: string
          comment_create_date: string | null
          comment_create_time: string | null
          comment_id: string
          comment_text: string | null
          user_id: string
        }
        Insert: {
          blog_id: string
          comment_create_date?: string | null
          comment_create_time?: string | null
          comment_id: string
          comment_text?: string | null
          user_id: string
        }
        Update: {
          blog_id?: string
          comment_create_date?: string | null
          comment_create_time?: string | null
          comment_id?: string
          comment_text?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blog comment_user id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_account"
            referencedColumns: ["user_id"]
          },
        ]
      }
      blog_like: {
        Row: {
          blog_id: string
          like_date: string | null
          like_time: string | null
          user_id: string
        }
        Insert: {
          blog_id: string
          like_date?: string | null
          like_time?: string | null
          user_id: string
        }
        Update: {
          blog_id?: string
          like_date?: string | null
          like_time?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blog like_user id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_account"
            referencedColumns: ["user_id"]
          },
        ]
      }
      blog_reply: {
        Row: {
          comment_create_date: string | null
          comment_create_time: string | null
          comment_id: string
          comment_text: string | null
          reply_id: string
          user_id: string
        }
        Insert: {
          comment_create_date?: string | null
          comment_create_time?: string | null
          comment_id: string
          comment_text?: string | null
          reply_id: string
          user_id: string
        }
        Update: {
          comment_create_date?: string | null
          comment_create_time?: string | null
          comment_id?: string
          comment_text?: string | null
          reply_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blog reply_user id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_account"
            referencedColumns: ["user_id"]
          },
        ]
      }
      blog_save: {
        Row: {
          blog_id: string
          save_date: string | null
          user_id: string
        }
        Insert: {
          blog_id: string
          save_date?: string | null
          user_id: string
        }
        Update: {
          blog_id?: string
          save_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "User Save Blog_user id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_account"
            referencedColumns: ["user_id"]
          },
        ]
      }
      category: {
        Row: {
          category_id: string
          category_name: string
          description: string | null
        }
        Insert: {
          category_id: string
          category_name: string
          description?: string | null
        }
        Update: {
          category_id?: string
          category_name?: string
          description?: string | null
        }
        Relationships: []
      }
      organization: {
        Row: {
          address: string | null
          blogs_id: string[] | null
          description: string | null
          followers_count: number | null
          followers_id: string[] | null
          members_id: string[] | null
          organization_id: string
          organization_name: string
          phone_num: string | null
        }
        Insert: {
          address?: string | null
          blogs_id?: string[] | null
          description?: string | null
          followers_count?: number | null
          followers_id?: string[] | null
          members_id?: string[] | null
          organization_id: string
          organization_name: string
          phone_num?: string | null
        }
        Update: {
          address?: string | null
          blogs_id?: string[] | null
          description?: string | null
          followers_count?: number | null
          followers_id?: string[] | null
          members_id?: string[] | null
          organization_id?: string
          organization_name?: string
          phone_num?: string | null
        }
        Relationships: []
      }
      role: {
        Row: {
          role_authority_id: string | null
          role_id: string
          role_name: string
        }
        Insert: {
          role_authority_id?: string | null
          role_id: string
          role_name: string
        }
        Update: {
          role_authority_id?: string | null
          role_id?: string
          role_name?: string
        }
        Relationships: []
      }
      role_authority: {
        Row: {
          comment: boolean | null
          edit: boolean
          read: boolean | null
          role_authority_id: string
        }
        Insert: {
          comment?: boolean | null
          edit: boolean
          read?: boolean | null
          role_authority_id: string
        }
        Update: {
          comment?: boolean | null
          edit?: boolean
          read?: boolean | null
          role_authority_id?: string
        }
        Relationships: []
      }
      session: {
        Row: {
          organization_id: string | null
          session_id: string
        }
        Insert: {
          organization_id?: string | null
          session_id: string
        }
        Update: {
          organization_id?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["organization_id"]
          },
        ]
      }
      user_account: {
        Row: {
          last_login: string | null
          register_date: string | null
          user_id: string
        }
        Insert: {
          last_login?: string | null
          register_date?: string | null
          user_id: string
        }
        Update: {
          last_login?: string | null
          register_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_info: {
        Row: {
          age: number | null
          country: string | null
          email: string
          "last name": string | null
          name: string | null
          organization_id: string[] | null
          phone_number: number | null
          role_id: string
          user_id: string
          username: string | null
        }
        Insert: {
          age?: number | null
          country?: string | null
          email: string
          "last name"?: string | null
          name?: string | null
          organization_id?: string[] | null
          phone_number?: number | null
          role_id: string
          user_id: string
          username?: string | null
        }
        Update: {
          age?: number | null
          country?: string | null
          email?: string
          "last name"?: string | null
          name?: string | null
          organization_id?: string[] | null
          phone_number?: number | null
          role_id?: string
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "User Info_user id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_account"
            referencedColumns: ["user_id"]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

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
          "blog detail": string | null
          "blog id": string
          "blog post date": string | null
          "blog post time": string | null
          "category id": string
          publish: boolean | null
          "user id": string
        }
        Insert: {
          "blog detail"?: string | null
          "blog id": string
          "blog post date"?: string | null
          "blog post time"?: string | null
          "category id": string
          publish?: boolean | null
          "user id": string
        }
        Update: {
          "blog detail"?: string | null
          "blog id"?: string
          "blog post date"?: string | null
          "blog post time"?: string | null
          "category id"?: string
          publish?: boolean | null
          "user id"?: string
        }
        Relationships: []
      }
      blog_comment: {
        Row: {
          "blog id": string
          "comment create date": string | null
          "comment create time": string | null
          "comment id": string
          "comment text": string | null
          "user id": string
        }
        Insert: {
          "blog id": string
          "comment create date"?: string | null
          "comment create time"?: string | null
          "comment id": string
          "comment text"?: string | null
          "user id": string
        }
        Update: {
          "blog id"?: string
          "comment create date"?: string | null
          "comment create time"?: string | null
          "comment id"?: string
          "comment text"?: string | null
          "user id"?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blog comment_user id_fkey"
            columns: ["user id"]
            isOneToOne: false
            referencedRelation: "user_account"
            referencedColumns: ["user_id"]
          },
        ]
      }
      blog_like: {
        Row: {
          "blog id": string
          "like date": string | null
          "like time": string | null
          "user id": string
        }
        Insert: {
          "blog id": string
          "like date"?: string | null
          "like time"?: string | null
          "user id": string
        }
        Update: {
          "blog id"?: string
          "like date"?: string | null
          "like time"?: string | null
          "user id"?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blog like_user id_fkey"
            columns: ["user id"]
            isOneToOne: false
            referencedRelation: "user_account"
            referencedColumns: ["user_id"]
          },
        ]
      }
      blog_reply: {
        Row: {
          "comment create date": string | null
          "comment create time": string | null
          "comment id": string
          "comment text": string | null
          "reply id": string
          "user id": string
        }
        Insert: {
          "comment create date"?: string | null
          "comment create time"?: string | null
          "comment id": string
          "comment text"?: string | null
          "reply id": string
          "user id": string
        }
        Update: {
          "comment create date"?: string | null
          "comment create time"?: string | null
          "comment id"?: string
          "comment text"?: string | null
          "reply id"?: string
          "user id"?: string
        }
        Relationships: [
          {
            foreignKeyName: "Blog reply_user id_fkey"
            columns: ["user id"]
            isOneToOne: false
            referencedRelation: "user_account"
            referencedColumns: ["user_id"]
          },
        ]
      }
      blog_save: {
        Row: {
          "blog id": string
          "save date": string | null
          "user id": string
        }
        Insert: {
          "blog id": string
          "save date"?: string | null
          "user id": string
        }
        Update: {
          "blog id"?: string
          "save date"?: string | null
          "user id"?: string
        }
        Relationships: [
          {
            foreignKeyName: "User Save Blog_user id_fkey"
            columns: ["user id"]
            isOneToOne: false
            referencedRelation: "user_account"
            referencedColumns: ["user_id"]
          },
        ]
      }
      category: {
        Row: {
          "category id": string
          "category name": string
          description: string | null
        }
        Insert: {
          "category id": string
          "category name": string
          description?: string | null
        }
        Update: {
          "category id"?: string
          "category name"?: string
          description?: string | null
        }
        Relationships: []
      }
      organization: {
        Row: {
          address: string | null
          members_id: string[] | null
          organization_id: string
          organization_name: string
          phone_num: string | null
        }
        Insert: {
          address?: string | null
          members_id?: string[] | null
          organization_id: string
          organization_name: string
          phone_num?: string | null
        }
        Update: {
          address?: string | null
          members_id?: string[] | null
          organization_id?: string
          organization_name?: string
          phone_num?: string | null
        }
        Relationships: []
      }
      role: {
        Row: {
          "role authority id": string | null
          "role id": string
          "role name": string
        }
        Insert: {
          "role authority id"?: string | null
          "role id": string
          "role name": string
        }
        Update: {
          "role authority id"?: string | null
          "role id"?: string
          "role name"?: string
        }
        Relationships: []
      }
      role_authority: {
        Row: {
          comment: boolean | null
          edit: boolean
          read: boolean | null
          "role authority id": string
        }
        Insert: {
          comment?: boolean | null
          edit: boolean
          read?: boolean | null
          "role authority id": string
        }
        Update: {
          comment?: boolean | null
          edit?: boolean
          read?: boolean | null
          "role authority id"?: string
        }
        Relationships: []
      }
      user_account: {
        Row: {
          "last login": string | null
          register_date: string | null
          user_id: string
        }
        Insert: {
          "last login"?: string | null
          register_date?: string | null
          user_id: string
        }
        Update: {
          "last login"?: string | null
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
          "phone number": number | null
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
          "phone number"?: number | null
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
          "phone number"?: number | null
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

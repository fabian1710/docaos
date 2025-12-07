export type Json = any

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
      workspaces: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      folders: {
        Row: {
          id: string
          workspace_id: string
          parent_id: string | null
          name: string
          icon: string | null
          color: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          parent_id?: string | null
          name: string
          icon?: string | null
          color?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          parent_id?: string | null
          name?: string
          icon?: string | null
          color?: string | null
          sort_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "folders_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "folders"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          id: string
          workspace_id: string
          folder_id: string | null
          title: string
          storage_path: string | null
          mime_type: string | null
          file_size: number | null
          version: number
          metadata: Json
          tags: string[]
          status: 'inbox' | 'processed' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          workspace_id: string
          folder_id?: string | null
          title: string
          storage_path?: string | null
          mime_type?: string | null
          file_size?: number | null
          version?: number
          metadata?: Json
          tags?: string[]
          status?: 'inbox' | 'processed' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          workspace_id?: string
          folder_id?: string | null
          title?: string
          storage_path?: string | null
          mime_type?: string | null
          file_size?: number | null
          version?: number
          metadata?: Json
          tags?: string[]
          status?: 'inbox' | 'processed' | 'archived'
          created_at?: string
          updated_at?: string
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

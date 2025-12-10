/**
 * Database Types
 * 
 * These types mirror the Supabase database schema.
 * Update these when you modify the database structure.
 */

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          name: string
          slug: string
          domain: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          domain?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          domain?: string | null
          created_at?: string
        }
      }
      project_admins: {
        Row: {
          id: string
          project_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          project_id: string
          slug: string
          title: string
          excerpt: string | null
          picture_url: string | null
          content: string | null
          read_time: number
          category: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          slug: string
          title: string
          excerpt?: string | null
          picture_url?: string | null
          content?: string | null
          read_time?: number
          category?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          slug?: string
          title?: string
          excerpt?: string | null
          picture_url?: string | null
          content?: string | null
          read_time?: number
          category?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Convenience types
export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']

export type ProjectAdmin = Database['public']['Tables']['project_admins']['Row']

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']

// Extended types with relations
export type BlogPostWithProject = BlogPost & {
  project?: Project
}
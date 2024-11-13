export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'admin' | 'therapist'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: 'admin' | 'therapist'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'admin' | 'therapist'
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          name: string
          birth_date: string
          responsible: string | null
          notes: string | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          birth_date: string
          responsible?: string
          notes?: string
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          name?: string
          birth_date?: string
          responsible?: string
          notes?: string
          status?: 'active' | 'inactive'
          updated_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          patient_id: string
          date: string
          activities: string
          progress: string
          next_steps: string
          status: 'scheduled' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          patient_id: string
          date: string
          activities: string
          progress: string
          next_steps: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          date?: string
          activities?: string
          progress?: string
          next_steps?: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          patient_id: string
          title: string
          description: string
          target_date: string
          progress: number
          status: 'pending' | 'in_progress' | 'completed'
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          patient_id: string
          title: string
          description: string
          target_date: string
          progress?: number
          status?: 'pending' | 'in_progress' | 'completed'
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          title?: string
          description?: string
          target_date?: string
          progress?: number
          status?: 'pending' | 'in_progress' | 'completed'
          updated_at?: string
        }
      }
      checklists: {
        Row: {
          id: string
          patient_id: string
          template_id: string
          evaluation_date: string
          data: Json
          status: 'in_progress' | 'completed'
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          patient_id: string
          template_id: string
          evaluation_date: string
          data: Json
          status?: 'in_progress' | 'completed'
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          evaluation_date?: string
          data?: Json
          status?: 'in_progress' | 'completed'
          updated_at?: string
        }
      }
    }
  }
}
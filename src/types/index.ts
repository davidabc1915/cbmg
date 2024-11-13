export interface Session {
  id: string;
  user_id: string;
  patient_id: string;
  patient_name: string;
  date: string;
  activities: string;
  progress: string;
  next_steps: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Checklist {
  id: string;
  user_id: string;
  patient_id: string;
  patient_name: string;
  template_id: string;
  template_name: string;
  evaluation_date: string;
  categories: ChecklistCategory[];
  status: 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface ChecklistCategory {
  id: string;
  name: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
  date?: string;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  description: string;
  categories: ChecklistCategory[];
}

export interface ChecklistProgress {
  categoryId: string;
  completed: number;
  total: number;
  percentage: number;
}

export interface Goal {
  id: string;
  user_id: string;
  patient_id: string;
  patient_name: string;
  title: string;
  description: string;
  target_date: string;
  progress: number;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}
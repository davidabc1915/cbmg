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
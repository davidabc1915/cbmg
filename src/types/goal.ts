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
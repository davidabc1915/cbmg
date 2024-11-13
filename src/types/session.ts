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
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Tables = Database['public']['Tables'];

export async function getPatients(userId: string) {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('user_id', userId)
    .order('name');
  
  return { data, error };
}

export async function getSessions(userId: string) {
  const { data, error } = await supabase
    .from('sessions')
    .select('*, patients(name)')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  
  return { data, error };
}

export async function getGoals(userId: string) {
  const { data, error } = await supabase
    .from('goals')
    .select('*, patients(name)')
    .eq('user_id', userId)
    .order('target_date');
  
  return { data, error };
}

export async function getChecklists(userId: string) {
  const { data, error } = await supabase
    .from('checklists')
    .select('*, patients(name)')
    .eq('user_id', userId)
    .order('evaluation_date', { ascending: false });
  
  return { data, error };
}
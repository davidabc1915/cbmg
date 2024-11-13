import { supabase } from '../lib/supabase';

async function migratePatients(userId: string) {
  const patients = JSON.parse(localStorage.getItem('patients') || '[]');
  
  for (const patient of patients) {
    try {
      const { error } = await supabase
        .from('patients')
        .insert({
          ...patient,
          user_id: userId,
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error migrating patient:', error);
    }
  }
}

async function migrateSessions(userId: string) {
  const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
  
  for (const session of sessions) {
    try {
      const { error } = await supabase
        .from('sessions')
        .insert({
          ...session,
          user_id: userId,
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error migrating session:', error);
    }
  }
}

async function migrateGoals(userId: string) {
  const goals = JSON.parse(localStorage.getItem('goals') || '[]');
  
  for (const goal of goals) {
    try {
      const { error } = await supabase
        .from('goals')
        .insert({
          ...goal,
          user_id: userId,
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error migrating goal:', error);
    }
  }
}

async function migrateChecklists(userId: string) {
  const checklists = JSON.parse(localStorage.getItem('checklists') || '[]');
  
  for (const checklist of checklists) {
    try {
      const { error } = await supabase
        .from('checklists')
        .insert({
          ...checklist,
          user_id: userId,
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error migrating checklist:', error);
    }
  }
}

export async function migrateAllData(userId: string) {
  await migratePatients(userId);
  await migrateSessions(userId);
  await migrateGoals(userId);
  await migrateChecklists(userId);
}
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Patient, PatientSemiology } from '../types/patient';
import { Session } from '../types/session';
import { Goal } from '../types/goal';
import { Checklist } from '../types/checklist';
import { useAuth } from './AuthContext';

interface DataContextType {
  // Patients
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePatient: (patient: Patient) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  updatePatientSemiology: (patientId: string, semiology: PatientSemiology) => Promise<void>;
  
  // Sessions
  sessions: Session[];
  addSession: (session: Omit<Session, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateSession: (session: Session) => Promise<void>;
  deleteSession: (id: string) => Promise<void>;
  
  // Goals
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateGoal: (goal: Goal) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  
  // Checklists
  checklists: Checklist[];
  addChecklist: (checklist: Omit<Checklist, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateChecklist: (checklist: Checklist) => Promise<void>;
  deleteChecklist: (id: string) => Promise<void>;

  // Loading state
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [checklists, setChecklists] = useState<Checklist[]>([]);

  // Carregar dados iniciais
  useEffect(() => {
    if (user) {
      loadInitialData();
    }
  }, [user]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadPatients(),
        loadSessions(),
        loadGoals(),
        loadChecklists()
      ]);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Funções de carregamento
  const loadPatients = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('user_id', user.id)
      .order('name');
    
    if (error) throw error;
    setPatients(data || []);
  };

  const loadSessions = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });
    
    if (error) throw error;
    setSessions(data || []);
  };

  const loadGoals = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .order('target_date');
    
    if (error) throw error;
    setGoals(data || []);
  };

  const loadChecklists = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('checklists')
      .select('*')
      .eq('user_id', user.id)
      .order('evaluation_date', { ascending: false });
    
    if (error) throw error;
    setChecklists(data || []);
  };

  // Funções CRUD para pacientes
  const addPatient = async (patientData: Omit<Patient, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('patients')
      .insert({
        ...patientData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    setPatients(prev => [...prev, data]);
  };

  const updatePatient = async (patient: Patient) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { error } = await supabase
      .from('patients')
      .update(patient)
      .eq('id', patient.id)
      .eq('user_id', user.id);

    if (error) throw error;
    setPatients(prev => prev.map(p => p.id === patient.id ? patient : p));
  };

  const deletePatient = async (id: string) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  const updatePatientSemiology = async (patientId: string, semiology: PatientSemiology) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { error } = await supabase
      .from('patients')
      .update({ 
        semiology,
        updated_at: new Date().toISOString()
      })
      .eq('id', patientId)
      .eq('user_id', user.id);

    if (error) throw error;
    
    setPatients(prev => prev.map(p => 
      p.id === patientId 
        ? { ...p, semiology, updated_at: new Date().toISOString() }
        : p
    ));
  };

  // Funções CRUD para sessões
  const addSession = async (sessionData: Omit<Session, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        ...sessionData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    setSessions(prev => [...prev, data]);
  };

  const updateSession = async (session: Session) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { error } = await supabase
      .from('sessions')
      .update(session)
      .eq('id', session.id)
      .eq('user_id', user.id);

    if (error) throw error;
    setSessions(prev => prev.map(s => s.id === session.id ? session : s));
  };

  const deleteSession = async (id: string) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
    setSessions(prev => prev.filter(s => s.id !== id));
  };

  // Funções CRUD para metas
  const addGoal = async (goalData: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('goals')
      .insert({
        ...goalData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    setGoals(prev => [...prev, data]);
  };

  const updateGoal = async (goal: Goal) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { error } = await supabase
      .from('goals')
      .update(goal)
      .eq('id', goal.id)
      .eq('user_id', user.id);

    if (error) throw error;
    setGoals(prev => prev.map(g => g.id === goal.id ? goal : g));
  };

  const deleteGoal = async (id: string) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  // Funções CRUD para checklists
  const addChecklist = async (checklistData: Omit<Checklist, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { data, error } = await supabase
      .from('checklists')
      .insert({
        ...checklistData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    setChecklists(prev => [...prev, data]);
  };

  const updateChecklist = async (checklist: Checklist) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { error } = await supabase
      .from('checklists')
      .update(checklist)
      .eq('id', checklist.id)
      .eq('user_id', user.id);

    if (error) throw error;
    setChecklists(prev => prev.map(c => c.id === checklist.id ? checklist : c));
  };

  const deleteChecklist = async (id: string) => {
    if (!user) throw new Error('Usuário não autenticado');

    const { error } = await supabase
      .from('checklists')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
    setChecklists(prev => prev.filter(c => c.id !== id));
  };

  return (
    <DataContext.Provider value={{
      // Patients
      patients,
      addPatient,
      updatePatient,
      deletePatient,
      updatePatientSemiology,
      
      // Sessions
      sessions,
      addSession,
      updateSession,
      deleteSession,
      
      // Goals
      goals,
      addGoal,
      updateGoal,
      deleteGoal,
      
      // Checklists
      checklists,
      addChecklist,
      updateChecklist,
      deleteChecklist,

      // Loading state
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
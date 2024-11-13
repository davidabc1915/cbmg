import { createContext, useContext, ReactNode } from 'react';
import { Patient, PatientSemiology } from '../types/patient';
import { useData } from './DataContext';

interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePatient: (patient: Patient) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  updatePatientSemiology: (patientId: string, semiology: PatientSemiology) => Promise<void>;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const { 
    patients,
    addPatient: dataAddPatient,
    updatePatient: dataUpdatePatient,
    deletePatient: dataDeletePatient
  } = useData();

  const updatePatientSemiology = async (patientId: string, semiology: PatientSemiology) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;

    await dataUpdatePatient({
      ...patient,
      semiology: {
        ...semiology,
        updatedAt: new Date().toISOString()
      }
    });
  };

  return (
    <PatientContext.Provider value={{
      patients,
      addPatient: dataAddPatient,
      updatePatient: dataUpdatePatient,
      deletePatient: dataDeletePatient,
      updatePatientSemiology
    }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatientContext() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatientContext must be used within a PatientProvider');
  }
  return context;
}
import { useState, useEffect } from 'react';
import { Patient } from '../types/patient';

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  const updatePatients = (newPatients: Patient[]) => {
    setPatients(newPatients);
    localStorage.setItem('patients', JSON.stringify(newPatients));
  };

  const addPatient = (patient: Patient) => {
    const newPatients = [...patients, patient];
    updatePatients(newPatients);
  };

  const updatePatient = (updatedPatient: Patient) => {
    const newPatients = patients.map(p => 
      p.id === updatedPatient.id ? updatedPatient : p
    );
    updatePatients(newPatients);
  };

  const deletePatient = (id: string) => {
    const newPatients = patients.filter(p => p.id !== id);
    updatePatients(newPatients);
  };

  return {
    patients,
    addPatient,
    updatePatient,
    deletePatient
  };
}
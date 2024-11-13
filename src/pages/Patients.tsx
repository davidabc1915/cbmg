import { useState } from 'react';
import { Plus, Search, User2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Patient } from '../types/patient';
import { PatientModal } from '../components/modals/PatientModal';
import { PatientList } from '../components/patients/PatientList';
import { useData } from '../contexts/DataContext';

export function Patients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>();
  const { patients, addPatient, updatePatient, deletePatient, loading } = useData();

  // Inicializar filteredPatients como array vazio se patients for undefined
  const filteredPatients = patients?.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleSavePatient = async (patientData: Partial<Patient>) => {
    try {
      if (selectedPatient) {
        await updatePatient({
          ...selectedPatient,
          ...patientData,
        } as Patient);
      } else {
        await addPatient(patientData);
      }
      setIsModalOpen(false);
      setSelectedPatient(undefined);
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  const handleDeletePatient = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        await deletePatient(id);
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando pacientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pacientes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredPatients.length} {filteredPatients.length === 1 ? 'paciente cadastrado' : 'pacientes cadastrados'}
          </p>
        </div>
        <Button onClick={() => {
          setSelectedPatient(undefined);
          setIsModalOpen(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Paciente
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Buscar pacientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
              icon={<Search className="w-4 h-4 text-gray-400" />}
            />
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <User2 className="w-4 h-4 mr-1" />
              <span>Total: {filteredPatients.length}</span>
            </div>
          </div>
        </div>

        <PatientList
          patients={filteredPatients}
          onEdit={(patient) => {
            setSelectedPatient(patient);
            setIsModalOpen(true);
          }}
          onDelete={handleDeletePatient}
        />
      </div>

      <PatientModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPatient(undefined);
        }}
        onSave={handleSavePatient}
        patient={selectedPatient}
      />
    </div>
  );
}
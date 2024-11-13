import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Patient, PatientSemiology } from '../../types/patient';
import { SemiologyForm } from '../patients/SemiologyForm';
import { useData } from '../../contexts/DataContext';

interface SemiologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

export function SemiologyModal({ isOpen, onClose, patient }: SemiologyModalProps) {
  const { updatePatientSemiology } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = async (semiologyData: PatientSemiology) => {
    setLoading(true);
    setError('');

    try {
      await updatePatientSemiology(patient.id, semiologyData);
      onClose();
    } catch (err) {
      console.error('Error saving semiology:', err);
      setError('Erro ao salvar semiologia. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Semiologia - {patient.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <SemiologyForm
          initialData={patient.semiology}
          onSave={handleSave}
          onCancel={onClose}
          disabled={loading}
        />
      </div>
    </div>
  );
}
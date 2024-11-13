import { useState } from 'react';
import { Patient } from '../../types/patient';
import { Button } from '../ui/Button';
import { FileText, Edit, Trash2 } from 'lucide-react';
import { SemiologyModal } from '../modals/SemiologyModal';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
  onUpdateSemiology: (id: string, semiology: PatientSemiology) => void;
}

export function PatientCard({ patient, onEdit, onDelete, onUpdateSemiology }: PatientCardProps) {
  const [isSemiologyModalOpen, setIsSemiologyModalOpen] = useState(false);

  const handleSemiologySave = (semiologyData: PatientSemiology) => {
    onUpdateSemiology(patient.id, semiologyData);
    setIsSemiologyModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {patient.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(patient.birthDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSemiologyModalOpen(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Semiologia
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(patient)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(patient.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      {/* Status da Semiologia */}
      {patient.semiology && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Última atualização da semiologia: {new Date(patient.semiology.updatedAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
      )}

      <SemiologyModal
        isOpen={isSemiologyModalOpen}
        onClose={() => setIsSemiologyModalOpen(false)}
        onSave={handleSemiologySave}
        initialData={patient.semiology}
        patientName={patient.name}
      />
    </div>
  );
}
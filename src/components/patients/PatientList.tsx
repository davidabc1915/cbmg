import { useState } from 'react';
import { Eye, Edit, Trash2, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { Patient } from '../../types/patient';
import { SemiologyModal } from '../modals/SemiologyModal';
import { PatientDetailsModal } from '../modals/PatientDetailsModal';
import { formatDate } from '../../utils/date';

interface PatientListProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string) => void;
}

export function PatientList({ patients, onEdit, onDelete }: PatientListProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isSemiologyModalOpen, setIsSemiologyModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Idade
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Responsável
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {patients.map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {patient.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(patient.birth_date)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {calculateAge(patient.birth_date)} anos
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {patient.responsible || '-'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPatient(patient);
                    setIsDetailsModalOpen(true);
                  }}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Detalhes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedPatient(patient);
                    setIsSemiologyModalOpen(true);
                  }}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Semiologia
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(patient)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(patient.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && (
        <>
          <SemiologyModal
            isOpen={isSemiologyModalOpen}
            onClose={() => setIsSemiologyModalOpen(false)}
            patient={selectedPatient}
          />
          <PatientDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            patient={selectedPatient}
          />
        </>
      )}
    </div>
  );
}
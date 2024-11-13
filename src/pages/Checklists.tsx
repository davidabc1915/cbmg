import { useState } from 'react';
import { Plus, Search, Filter, Edit } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Checklist } from '../types';
import { ChecklistModal } from '../components/modals/ChecklistModal';
import { CHECKLIST_TEMPLATES } from '../data/esdmTemplates';
import { useData } from '../contexts/DataContext';
import { formatDate } from '../utils/date';

export function Checklists() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | undefined>();
  const { checklists, addChecklist, updateChecklist, patients } = useData();

  const filteredChecklists = checklists.filter(checklist => {
    const matchesSearch = checklist.patient_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTemplate = !selectedTemplate || checklist.template_id === selectedTemplate;
    const matchesPatient = !selectedPatient || checklist.patient_id === selectedPatient;
    return matchesSearch && matchesTemplate && matchesPatient;
  });

  const handleSaveChecklist = async (checklistData: Partial<Checklist>) => {
    try {
      if (selectedChecklist) {
        await updateChecklist({
          ...selectedChecklist,
          ...checklistData,
        } as Checklist);
      } else {
        await addChecklist(checklistData as Omit<Checklist, 'id' | 'user_id' | 'created_at' | 'updated_at'>);
      }
      setIsModalOpen(false);
      setSelectedChecklist(undefined);
    } catch (error) {
      console.error('Error saving checklist:', error);
    }
  };

  const handleEditChecklist = (checklist: Checklist) => {
    setSelectedChecklist(checklist);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Checklists</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {checklists.length} {checklists.length === 1 ? 'checklist' : 'checklists'}
          </p>
        </div>
        <Button onClick={() => {
          setSelectedChecklist(undefined);
          setIsModalOpen(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Checklist
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Buscar por paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4 text-gray-400" />}
            />
            
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 text-sm dark:bg-gray-700 dark:text-white p-2"
            >
              <option value="">Todos os pacientes</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>

            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 text-sm dark:bg-gray-700 dark:text-white p-2"
            >
              <option value="">Todos os templates</option>
              {CHECKLIST_TEMPLATES.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Template
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredChecklists.map((checklist) => (
                <tr
                  key={checklist.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {checklist.patient_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {checklist.template_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(checklist.evaluation_date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      checklist.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {checklist.status === 'completed' ? 'Concluído' : 'Em Progresso'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditChecklist(checklist)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ChecklistModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedChecklist(undefined);
        }}
        onSave={handleSaveChecklist}
        checklist={selectedChecklist}
        patients={patients}
        templates={CHECKLIST_TEMPLATES}
      />
    </div>
  );
}
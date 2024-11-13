import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Checklist, ChecklistTemplate } from '../../types';
import { useData } from '../../contexts/DataContext';
import { toISODate } from '../../utils/date';

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (checklist: Partial<Checklist>) => Promise<void>;
  checklist?: Checklist;
  templates: ChecklistTemplate[];
}

export function ChecklistModal({
  isOpen,
  onClose,
  onSave,
  checklist,
  templates
}: ChecklistModalProps) {
  const { patients } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState({
    patient_id: '',
    template_id: templates[0]?.id || '',
    evaluation_date: toISODate(new Date().toISOString()),
    categories: templates[0]?.categories || [],
    status: 'in_progress' as const
  });

  useEffect(() => {
    if (checklist) {
      setForm({
        patient_id: checklist.patient_id,
        template_id: checklist.template_id,
        evaluation_date: toISODate(checklist.evaluation_date),
        categories: checklist.categories,
        status: checklist.status
      });
    } else {
      setForm({
        patient_id: '',
        template_id: templates[0]?.id || '',
        evaluation_date: toISODate(new Date().toISOString()),
        categories: templates[0]?.categories || [],
        status: 'in_progress'
      });
    }
  }, [checklist, templates]);

  const handleTemplateChange = (templateId: string) => {
    const selectedTemplate = templates.find(t => t.id === templateId);
    if (selectedTemplate) {
      setForm({
        ...form,
        template_id: templateId,
        categories: JSON.parse(JSON.stringify(selectedTemplate.categories))
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const selectedTemplate = templates.find(t => t.id === form.template_id);
      const selectedPatient = patients.find(p => p.id === form.patient_id);
      
      if (!selectedTemplate || !selectedPatient) {
        throw new Error('Template ou paciente não encontrado');
      }

      await onSave({
        ...form,
        template_name: selectedTemplate.name,
        patient_name: selectedPatient.name,
        evaluation_date: new Date(form.evaluation_date).toISOString()
      });
      onClose();
    } catch (err) {
      console.error('Error saving checklist:', err);
      setError('Erro ao salvar checklist. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {checklist ? 'Editar Checklist' : 'Novo Checklist'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Paciente
              </label>
              <select
                value={form.patient_id}
                onChange={(e) => setForm({ ...form, patient_id: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Selecione um paciente</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Template
              </label>
              <select
                value={form.template_id}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm dark:bg-gray-700 dark:text-white"
                required
              >
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Data da Avaliação
              </label>
              <Input
                type="date"
                value={form.evaluation_date}
                onChange={(e) => setForm({ ...form, evaluation_date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-6">
            {form.categories.map((category, categoryIndex) => (
              <div key={category.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  {category.name}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={(e) => {
                          const newCategories = [...form.categories];
                          newCategories[categoryIndex].items[itemIndex].completed = e.target.checked;
                          if (e.target.checked) {
                            newCategories[categoryIndex].items[itemIndex].date = new Date().toISOString();
                          }
                          setForm({ ...form, categories: newCategories });
                        }}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {item.title}
                        </span>
                        {item.completed && (
                          <input
                            type="text"
                            value={item.notes || ''}
                            onChange={(e) => {
                              const newCategories = [...form.categories];
                              newCategories[categoryIndex].items[itemIndex].notes = e.target.value;
                              setForm({ ...form, categories: newCategories });
                            }}
                            placeholder="Adicionar observação..."
                            className="mt-1 w-full text-sm rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
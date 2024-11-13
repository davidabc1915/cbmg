import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Goal } from '../../types/goal';
import { Patient } from '../../types/patient';
import { useData } from '../../contexts/DataContext';
import { toISODate } from '../../utils/date';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Partial<Goal>) => Promise<void>;
  goal?: Goal;
}

export function GoalModal({ isOpen, onClose, onSave, goal }: GoalModalProps) {
  const { patients } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState({
    patient_id: '',
    title: '',
    description: '',
    target_date: '',
    progress: 0,
    status: 'pending' as Goal['status']
  });

  useEffect(() => {
    if (goal) {
      setForm({
        patient_id: goal.patient_id,
        title: goal.title,
        description: goal.description,
        target_date: toISODate(goal.target_date),
        progress: goal.progress,
        status: goal.status
      });
    } else {
      setForm({
        patient_id: '',
        title: '',
        description: '',
        target_date: toISODate(new Date().toISOString()),
        progress: 0,
        status: 'pending'
      });
    }
  }, [goal]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const selectedPatient = patients.find(p => p.id === form.patient_id);
      if (!selectedPatient) {
        throw new Error('Paciente não selecionado');
      }

      await onSave({
        ...form,
        patient_name: selectedPatient.name,
        target_date: new Date(form.target_date).toISOString()
      });
      
      onClose();
    } catch (err) {
      console.error('Error saving goal:', err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar meta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {goal ? 'Editar Meta' : 'Nova Meta'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              Título
            </label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm dark:bg-gray-700 dark:text-white"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data Alvo
            </label>
            <Input
              type="date"
              value={form.target_date}
              onChange={(e) => setForm({ ...form, target_date: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Progresso (%)
            </label>
            <div className="flex items-center space-x-4">
              <Input
                type="range"
                min="0"
                max="100"
                value={form.progress}
                onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300 w-12">
                {form.progress}%
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Goal['status'] })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="pending">Pendente</option>
              <option value="in_progress">Em Progresso</option>
              <option value="completed">Concluída</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="flex justify-end space-x-3 mt-6">
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
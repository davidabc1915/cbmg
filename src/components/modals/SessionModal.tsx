import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Session } from '../../types/session';
import { toISODateTime } from '../../utils/date';
import { Patient } from '../../types/patient';

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: Partial<Session>) => void;
  session?: Session;
  patients: Patient[];
}

export function SessionModal({ isOpen, onClose, onSave, session, patients }: SessionModalProps) {
  const [form, setForm] = useState({
    patient_id: '',
    date: '',
    activities: '',
    progress: '',
    next_steps: '',
    status: 'scheduled' as Session['status']
  });

  useEffect(() => {
    if (session) {
      setForm({
        patient_id: session.patient_id,
        date: toISODateTime(session.date),
        activities: session.activities,
        progress: session.progress,
        next_steps: session.next_steps,
        status: session.status
      });
    } else {
      setForm({
        patient_id: '',
        date: toISODateTime(new Date().toISOString()),
        activities: '',
        progress: '',
        next_steps: '',
        status: 'scheduled'
      });
    }
  }, [session]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedPatient = patients.find(p => p.id === form.patient_id);
    if (!selectedPatient) return;

    onSave({
      ...form,
      patient_name: selectedPatient.name,
      date: new Date(form.date).toISOString()
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {session ? 'Editar Sessão' : 'Nova Sessão'}
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
              Data e Hora
            </label>
            <Input
              type="datetime-local"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Atividades
            </label>
            <textarea
              value={form.activities}
              onChange={(e) => setForm({ ...form, activities: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm dark:bg-gray-700 dark:text-white"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Progresso
            </label>
            <Input
              type="text"
              value={form.progress}
              onChange={(e) => setForm({ ...form, progress: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Próximos Passos
            </label>
            <textarea
              value={form.next_steps}
              onChange={(e) => setForm({ ...form, next_steps: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm dark:bg-gray-700 dark:text-white"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Session['status'] })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="scheduled">Agendada</option>
              <option value="completed">Concluída</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
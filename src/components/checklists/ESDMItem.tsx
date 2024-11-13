import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChecklistItem } from '../../types';
import { MessageSquare } from 'lucide-react';

interface ESDMItemProps {
  item: ChecklistItem;
  onUpdate: (itemId: string, updates: { completed?: boolean; notes?: string }) => void;
}

export function ESDMItem({ item, onUpdate }: ESDMItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(item.notes || '');

  const handleNotesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(item.id, { notes });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={(e) => onUpdate(item.id, { completed: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {item.title}
          </p>
          {item.date && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Atualizado em: {format(new Date(item.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </p>
          )}
          {item.notes && !isEditing && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 rounded p-2">
              {item.notes}
            </p>
          )}
          {isEditing ? (
            <form onSubmit={handleNotesSubmit} className="mt-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 text-sm dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="Adicione suas observações..."
              />
              <div className="mt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              {item.notes ? 'Editar observações' : 'Adicionar observações'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
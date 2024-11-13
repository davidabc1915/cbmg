import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Checklist, ChecklistProgress } from '../../types';
import { ESDMCategory } from './ESDMCategory';
import { ESDMProgress } from './ESDMProgress';

interface ESDMChecklistProps {
  checklist: Checklist;
  onUpdate: (checklist: Checklist) => void;
}

export function ESDMChecklist({ checklist, onUpdate }: ESDMChecklistProps) {
  const [activeCategory, setActiveCategory] = useState(checklist.categories[0]?.id);

  const calculateProgress = (): ChecklistProgress[] => {
    return checklist.categories.map(category => {
      const total = category.items.length;
      const completed = category.items.filter(item => item.completed).length;
      return {
        categoryId: category.id,
        completed,
        total,
        percentage: (completed / total) * 100
      };
    });
  };

  const handleItemUpdate = (categoryId: string, itemId: string, updates: { completed?: boolean; notes?: string }) => {
    const updatedCategories = checklist.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                ...updates,
                date: updates.completed !== undefined ? new Date().toISOString() : item.date
              };
            }
            return item;
          })
        };
      }
      return category;
    });

    onUpdate({
      ...checklist,
      categories: updatedCategories,
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {checklist.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Última atualização: {format(new Date(checklist.updatedAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>

        <ESDMProgress progress={calculateProgress()} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {checklist.categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3">
            {checklist.categories.map(category => (
              <div
                key={category.id}
                className={activeCategory === category.id ? 'block' : 'hidden'}
              >
                <ESDMCategory
                  category={category}
                  onItemUpdate={(itemId, updates) => handleItemUpdate(category.id, itemId, updates)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
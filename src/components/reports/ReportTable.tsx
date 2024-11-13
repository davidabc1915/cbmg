import { Checklist } from '../../types';
import { Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { exportToCSV } from '../../utils/export';
import { formatDate } from '../../utils/date';

interface ReportTableProps {
  checklists: Checklist[];
}

export function ReportTable({ checklists }: ReportTableProps) {
  const calculateProgress = (checklist: Checklist) => {
    const totalItems = checklist.categories.reduce((acc, cat) => acc + cat.items.length, 0);
    const completedItems = checklist.categories.reduce((acc, cat) => 
      acc + cat.items.filter(item => item.completed).length, 0
    );
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  const handleExportChecklist = (checklist: Checklist) => {
    const completedCategories = checklist.categories
      .map(category => {
        const completedItems = category.items.filter(item => item.completed);
        if (completedItems.length === 0) return null;
        
        return {
          name: category.name,
          items: completedItems.map(item => item.title).join('; '),
          progress: Math.round((completedItems.length / category.items.length) * 100)
        };
      })
      .filter(Boolean);

    const reportData = [{
      'Paciente': checklist.patient_name,
      'Template': checklist.template_name,
      'Data da Avaliação': formatDate(checklist.evaluation_date),
      'Status': checklist.status === 'completed' ? 'Concluído' : 'Em Progresso',
      'Progresso Total': `${calculateProgress(checklist)}%`,
      'Checklist(s) realizado(s)': completedCategories
        .map(cat => `${cat.name} (${cat.progress}%): ${cat.items}`)
        .join('\n'),
      'Criado em': formatDate(checklist.created_at),
      'Atualizado em': formatDate(checklist.updated_at)
    }];

    exportToCSV(reportData, `checklist-${checklist.patient_name}-${formatDate(checklist.evaluation_date)}`);
  };

  return (
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
              Progresso
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
          {checklists.map((checklist) => (
            <tr key={checklist.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {checklist.patient_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {checklist.template_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {formatDate(checklist.evaluation_date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${calculateProgress(checklist)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {calculateProgress(checklist)}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
                  onClick={() => handleExportChecklist(checklist)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Goal } from '../types/goal';
import { GoalModal } from '../components/modals/GoalModal';
import { useData } from '../contexts/DataContext';
import { formatDate } from '../utils/date';

export function Goals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();
  const { goals, addGoal, updateGoal } = useData();

  const filteredGoals = goals.filter(goal =>
    goal.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveGoal = async (goalData: Partial<Goal>) => {
    try {
      if (selectedGoal) {
        await updateGoal({
          ...selectedGoal,
          ...goalData,
        } as Goal);
      } else {
        await addGoal(goalData as Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>);
      }
      setIsModalOpen(false);
      setSelectedGoal(undefined);
    } catch (error) {
      console.error('Error saving goal:', error);
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Metas</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {goals.length} {goals.length === 1 ? 'meta cadastrada' : 'metas cadastradas'}
          </p>
        </div>
        <Button onClick={() => {
          setSelectedGoal(undefined);
          setIsModalOpen(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Meta
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Input
            placeholder="Buscar metas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
            icon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Meta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Data Alvo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Progresso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredGoals.map((goal) => (
                <tr
                  key={goal.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelectedGoal(goal);
                    setIsModalOpen(true);
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {goal.patient_name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{goal.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{goal.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(goal.target_date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                        <div
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {goal.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      goal.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : goal.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {goal.status === 'completed' ? 'Concluída' : 
                       goal.status === 'in_progress' ? 'Em Progresso' : 'Pendente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <GoalModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGoal(undefined);
        }}
        onSave={handleSaveGoal}
        goal={selectedGoal}
      />
    </div>
  );
}
import { useState, useMemo } from 'react';
import { Download, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ReportChart } from '../components/reports/ReportChart';
import { ReportTable } from '../components/reports/ReportTable';
import { exportToCSV } from '../utils/export';
import { useData } from '../contexts/DataContext';
import { formatDate } from '../utils/date';

export function Reports() {
  const { checklists, patients } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredChecklists = useMemo(() => {
    return checklists.filter(checklist => {
      const matchesSearch = checklist.patient_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPatient = !selectedPatient || checklist.patient_id === selectedPatient;
      const matchesTemplate = !selectedTemplate || checklist.template_id === selectedTemplate;
      const matchesDate = (!dateRange.start || checklist.evaluation_date >= dateRange.start) &&
                         (!dateRange.end || checklist.evaluation_date <= dateRange.end);
      
      return matchesSearch && matchesPatient && matchesTemplate && matchesDate;
    });
  }, [checklists, searchTerm, selectedPatient, selectedTemplate, dateRange]);

  const handleExportReport = () => {
    if (filteredChecklists.length === 0) return;

    const reportData = filteredChecklists.map(checklist => {
      // Calcular progresso total
      const totalItems = checklist.categories.reduce((acc, cat) => acc + cat.items.length, 0);
      const completedItems = checklist.categories.reduce((acc, cat) => 
        acc + cat.items.filter(item => item.completed).length, 0
      );

      // Preparar dados das categorias
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

      return {
        'Paciente': checklist.patient_name,
        'Template': checklist.template_name,
        'Data da Avaliação': formatDate(checklist.evaluation_date),
        'Status': checklist.status === 'completed' ? 'Concluído' : 'Em Progresso',
        'Progresso Total': `${Math.round((completedItems / totalItems) * 100)}%`,
        'Checklist(s) realizado(s)': completedCategories
          .map(cat => `${cat.name} (${cat.progress}%): ${cat.items}`)
          .join('\n'),
        'Criado em': formatDate(checklist.created_at),
        'Atualizado em': formatDate(checklist.updated_at)
      };
    });

    exportToCSV(reportData, `relatorio-checklists-${formatDate(new Date().toISOString())}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Relatórios</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredChecklists.length} {filteredChecklists.length === 1 ? 'checklist encontrado' : 'checklists encontrados'}
          </p>
        </div>
        <Button onClick={handleExportReport} disabled={filteredChecklists.length === 0}>
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="text-sm"
              placeholder="Data inicial"
            />

            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="text-sm"
              placeholder="Data final"
            />
          </div>
        </div>

        <div className="p-6">
          {selectedPatient && filteredChecklists.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Progresso do Paciente
              </h2>
              <div className="h-[400px]">
                <ReportChart data={filteredChecklists.map(checklist => ({
                  date: formatDate(checklist.evaluation_date),
                  template: checklist.template_name,
                  progress: checklist.categories.reduce((acc, cat) => {
                    const total = cat.items.length;
                    const completed = cat.items.filter(item => item.completed).length;
                    return acc + (completed / total) * 100;
                  }, 0) / checklist.categories.length
                }))} />
              </div>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Resumo dos Checklists
            </h2>
            <ReportTable checklists={filteredChecklists} />
          </div>
        </div>
      </div>
    </div>
  );
}
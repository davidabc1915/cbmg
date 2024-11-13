import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function formatValue(value: any, key: string): string {
  if (value === null || value === undefined) return '';

  // Formatar datas
  if (key.match(/data|date|criado|atualizado/i)) {
    try {
      return format(new Date(value), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch {
      return value;
    }
  }

  // Formatar status
  if (key === 'status') {
    const statusMap: Record<string, string> = {
      pending: 'Pendente',
      in_progress: 'Em Progresso',
      completed: 'Concluído',
      scheduled: 'Agendada',
      cancelled: 'Cancelada'
    };
    return statusMap[value] || value;
  }

  // Formatar categorias do checklist
  if (key === 'categories' && Array.isArray(value)) {
    return value
      .map(category => {
        const completedItems = category.items.filter((item: any) => item.completed);
        if (completedItems.length === 0) return null;
        
        return `${category.name}:\n${completedItems
          .map((item: any) => `- ${item.title}`)
          .join('\n')}`;
      })
      .filter(Boolean)
      .join('\n\n');
  }

  return String(value);
}

export function exportToCSV(data: any[], filename: string) {
  if (!data.length) return;

  // Preparar cabeçalhos
  const headers = Object.keys(data[0]).map(header => {
    if (header === 'categories') return 'Checklist(s) realizado(s)';
    return header
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  });

  // Preparar linhas
  const rows = data.map(item =>
    Object.entries(item).map(([key, value]) => {
      const formattedValue = formatValue(value, key);
      // Escapar valores que contêm vírgulas ou quebras de linha
      if (formattedValue.includes(',') || formattedValue.includes('\n')) {
        return `"${formattedValue.replace(/"/g, '""')}"`;
      }
      return formattedValue;
    })
  );

  // Montar CSV
  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Adicionar BOM para suporte a caracteres especiais
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  // Criar link de download
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
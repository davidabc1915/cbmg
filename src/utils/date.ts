export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '-';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  } catch {
    return '-';
  }
}

export function toISODate(dateString: string | undefined): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch {
    return '';
  }
}

export function toISODateTime(dateString: string | undefined): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  } catch {
    return '';
  }
}

export function formatDateTime(dateString: string | undefined): string {
  if (!dateString) return '-';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  } catch {
    return '-';
  }
}
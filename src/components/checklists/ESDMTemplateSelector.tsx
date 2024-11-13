import { ESDM_TEMPLATES } from '../../data/esdmTemplates';

interface ESDMTemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

export function ESDMTemplateSelector({ selectedTemplate, onSelect }: ESDMTemplateSelectorProps) {
  return (
    <div className="flex space-x-4">
      {Object.entries(ESDM_TEMPLATES).map(([id, template]) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedTemplate === id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {template.name}
        </button>
      ))}
    </div>
  );
}
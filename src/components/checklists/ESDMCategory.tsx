import { ChecklistCategory, ChecklistItem } from '../../types';
import { ESDMItem } from './ESDMItem';

interface ESDMCategoryProps {
  category: ChecklistCategory;
  onItemUpdate: (itemId: string, updates: { completed?: boolean; notes?: string }) => void;
}

export function ESDMCategory({ category, onItemUpdate }: ESDMCategoryProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {category.title}
      </h3>
      <div className="space-y-3">
        {category.items.map((item) => (
          <ESDMItem
            key={item.id}
            item={item}
            onUpdate={onItemUpdate}
          />
        ))}
      </div>
    </div>
  );
}
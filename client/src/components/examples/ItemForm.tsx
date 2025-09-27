import ItemForm from '../ItemForm';
import { InsertItem, Item } from '@shared/schema';

export default function ItemFormExample() {
  // Mock existing item for edit mode
  const mockItem: Item = {
    id: '1',
    title: 'Update Website Design',
    description: 'Implement the new Apple-inspired design with frosted glass effects',
    category: 'work',
    status: 'active',
    createdAt: new Date('2024-01-15T10:00:00Z'),
  };

  const handleSave = (item: InsertItem) => {
    console.log('Save triggered:', item);
  };

  const handleCancel = () => {
    console.log('Cancel triggered');
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Create Mode</h2>
      <ItemForm 
        onSave={handleSave}
        onCancel={handleCancel}
        isEdit={false}
      />
      
      <h2 className="text-lg font-semibold mb-4 mt-8">Edit Mode</h2>
      <ItemForm 
        item={mockItem}
        onSave={handleSave}
        onCancel={handleCancel}
        isEdit={true}
      />
    </div>
  );
}
import ItemList from '../ItemList';
import { Item } from '@shared/schema';

export default function ItemListExample() {
  // Mock data for demonstration
  const mockItems: Item[] = [
    {
      id: '1',
      title: 'Complete Project Documentation',
      description: 'Finish writing the comprehensive documentation for the new CRUD application with Apple-inspired design elements.',
      category: 'work',
      status: 'active',
      createdAt: new Date('2024-01-15T10:00:00Z'),
    },
    {
      id: '2',
      title: 'Exercise Routine',
      description: 'Morning workout: 30 minutes cardio + strength training',
      category: 'health',
      status: 'completed',
      createdAt: new Date('2024-01-14T06:00:00Z'),
    },
    {
      id: '3',
      title: 'Budget Review',
      description: 'Review monthly expenses and update financial goals',
      category: 'finance',
      status: 'pending',
      createdAt: new Date('2024-01-13T09:00:00Z'),
    },
    {
      id: '4',
      title: 'Learn React Patterns',
      description: 'Study advanced React patterns and best practices for component composition',
      category: 'education',
      status: 'active',
      createdAt: new Date('2024-01-12T14:00:00Z'),
    },
    {
      id: '5',
      title: 'Plan Weekend Trip',
      description: 'Research destinations and book accommodation for weekend getaway',
      category: 'travel',
      status: 'cancelled',
      createdAt: new Date('2024-01-11T16:00:00Z'),
    }
  ];

  const handleAddNew = () => {
    console.log('Add new item triggered');
  };

  const handleEdit = (item: Item) => {
    console.log('Edit triggered for:', item.title);
  };

  const handleDelete = (id: string) => {
    console.log('Delete triggered for ID:', id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ItemList 
        items={mockItems}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={false}
      />
    </div>
  );
}
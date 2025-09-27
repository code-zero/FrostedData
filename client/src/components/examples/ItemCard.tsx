import ItemCard from '../ItemCard';
import { Item } from '@shared/schema';

export default function ItemCardExample() {
  const mockItem: Item = {
    id: '1',
    title: 'Complete Project Documentation',
    description: 'Finish writing the comprehensive documentation for the new CRUD application with Apple-inspired design elements.',
    category: 'Work',
    status: 'active',
    createdAt: new Date('2024-01-15T10:00:00Z'),
  };

  const handleEdit = (item: Item) => {
    console.log('Edit triggered for:', item.title);
  };

  const handleDelete = (id: string) => {
    console.log('Delete triggered for ID:', id);
  };

  return (
    <ItemCard 
      item={mockItem}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
import { useState } from 'react';
import DeleteConfirmModal from '../DeleteConfirmModal';
import { Item } from '@shared/schema';
import { Button } from '@/components/ui/button';

export default function DeleteConfirmModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const mockItem: Item = {
    id: '1',
    title: 'Complete Project Documentation',
    description: 'Finish writing the comprehensive documentation for the new CRUD application with Apple-inspired design elements.',
    category: 'work',
    status: 'active',
    createdAt: new Date('2024-01-15T10:00:00Z'),
  };

  const handleConfirm = () => {
    setIsDeleting(true);
    console.log('Delete confirmed, processing...');
    
    // Simulate delete operation
    setTimeout(() => {
      setIsDeleting(false);
      setIsOpen(false);
      console.log('Item deleted successfully');
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Delete cancelled');
    setIsOpen(false);
    setIsDeleting(false);
  };

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)} variant="destructive">
        Open Delete Modal
      </Button>
      
      <DeleteConfirmModal
        isOpen={isOpen}
        item={mockItem}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isDeleting={isDeleting}
      />
    </div>
  );
}

import { useState } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { DesignSelector } from '../components/DesignSelector';
import { ItemForm } from '../components/ItemForm';
import { ItemList } from '../components/ItemList';
import { DeleteConfirmation } from '../components/DeleteConfirmation';
import { useDesign } from '../contexts/DesignContext';
import type { Item } from '../../shared/schema';

const initialItems: Item[] = [
  {
    id: '1',
    title: 'Complete Project Documentation',
    description: 'Finish writing comprehensive documentation for FrostedData with all design variations',
    category: 'work',
    status: 'active',
    createdAt: new Date('2024-01-15T10:00:00Z')
  },
  {
    id: '2',
    title: 'Morning Exercise Routine',
    description: '30 minutes cardio + strength training with focus on core',
    category: 'health',
    status: 'completed',
    createdAt: new Date('2024-01-14T06:00:00Z')
  },
  {
    id: '3',
    title: 'Monthly Budget Review',
    description: 'Review expenses and update financial goals for the quarter',
    category: 'finance',
    status: 'pending',
    createdAt: new Date('2024-01-13T09:00:00Z')
  }
];

export default function HomePage() {
  const { design } = useDesign();
  const [items, setItems] = useState<Item[]>(initialItems);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deletingItem, setDeletingItem] = useState<Item | null>(null);

  const handleAddNew = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: Item) => {
    setDeletingItem(item);
  };

  const handleSave = (itemData: Omit<Item, 'id' | 'createdAt'>) => {
    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...itemData } 
          : item
      ));
    } else {
      const newItem: Item = {
        ...itemData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      setItems([newItem, ...items]);
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleConfirmDelete = () => {
    if (deletingItem) {
      setItems(items.filter(item => item.id !== deletingItem.id));
      setDeletingItem(null);
    }
  };

  return (
    <div className={`min-h-screen bg-background transition-all duration-300 ${design === 'luxury' ? 'shimmer' : ''}`}>
      <div className="container mx-auto p-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-foreground mb-3 shimmer-glow">
              FrostedData
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Beautiful data management with frosted glass effects and smooth animations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DesignSelector />
          </div>
        </div>

        {/* Main Content */}
        <ItemList
          items={items}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Form Modal */}
        {isFormOpen && (
          <ItemForm
            item={editingItem || undefined}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingItem(null);
            }}
          />
        )}

        {/* Delete Confirmation */}
        {deletingItem && (
          <DeleteConfirmation
            item={deletingItem}
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeletingItem(null)}
          />
        )}
      </div>
    </div>
  );
}

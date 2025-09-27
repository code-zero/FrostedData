import { useState } from 'react';
import { Item, InsertItem } from '@shared/schema';
import ItemList from '@/components/ItemList';
import ItemForm from '@/components/ItemForm';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DesignSelector } from "@/components/DesignSelector";
import { useDesign } from "@/components/DesignProvider";

export default function Home() {
  const { design } = useDesign();
  
  // Mock data - todo: replace with real API calls and loading states - 
  const [items, setItems] = useState<Item[]>([
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
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deleteItem, setDeleteItem] = useState<Item | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { toast } = useToast();

  const handleAddNew = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleSave = (formData: InsertItem) => {
    if (editingItem) {
      // Edit existing item - todo: replace with API call
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData }
            : item
        )
      );
      toast({
        title: "Success!",
        description: "Item updated successfully",
      });
      console.log('Item updated:', { ...editingItem, ...formData });
    } else {
      // Create new item - todo: replace with API call
      const newItem: Item = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description || null,
        category: formData.category,
        status: formData.status,
        createdAt: new Date(),
      };
      setItems(prevItems => [newItem, ...prevItems]);
      toast({
        title: "Success!",
        description: "New item created successfully",
      });
      console.log('Item created:', newItem);
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setDeleteItem(item);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteItem) {
      setIsDeleting(true);
      
      // Simulate API call delay - todo: replace with real API call
      setTimeout(() => {
        setItems(prevItems => prevItems.filter(item => item.id !== deleteItem.id));
        toast({
          title: "Deleted!",
          description: "Item deleted successfully",
        });
        console.log('Item deleted:', deleteItem.id);
        setDeleteItem(null);
        setIsDeleting(false);
      }, 1000);
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleCancelDelete = () => {
    setDeleteItem(null);
    setIsDeleting(false);
  };

  const getDesignClasses = () => {
    switch (design) {
      case "minimal":
        return "min-h-screen bg-background";
      case "modern":
        return "min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5";
      case "compact":
        return "min-h-screen bg-muted/20";
      case "luxury":
        return "min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 shimmer";
      default:
        return "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800";
    }
  };

  return (
    <div className={getDesignClasses()}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-2 shimmer-glow">
              FrostedData
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Beautiful data management with frosted glass effects and smooth animations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DesignSelector />
            <ThemeToggle />
          </div>
        </div>

        {/* Main Content */}
        <ItemList
          items={items}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={false}
        />

        {/* Form Modal */}
        <Dialog open={isFormOpen} onOpenChange={handleCancelForm}>
          <DialogContent className="sm:max-w-2xl p-0 bg-transparent border-none shadow-none">
            <ItemForm
              item={editingItem || undefined}
              onSave={handleSave}
              onCancel={handleCancelForm}
              isEdit={!!editingItem}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={!!deleteItem}
          item={deleteItem}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}
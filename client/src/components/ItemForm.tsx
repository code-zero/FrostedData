
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import type { Item } from '../../shared/schema';

interface ItemFormProps {
  item?: Item;
  onSave: (item: Omit<Item, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function ItemForm({ item, onSave, onCancel }: ItemFormProps) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    category: item?.category || 'work',
    status: item?.status || 'pending'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-card frosted-glass rounded-3xl shadow-2xl w-full max-w-2xl p-8 animate-in slide-in-from-bottom duration-300 card-shimmer">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-foreground">
            {item ? 'Edit Item' : 'Create New Item'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="rounded-full hover:bg-destructive/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-6 py-4 bg-background border border-border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              placeholder="Enter item title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-6 py-4 bg-background border border-border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 min-h-[120px] resize-none"
              placeholder="Enter item description"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-6 py-4 bg-background border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="travel">Travel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-6 py-4 bg-background border border-border rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 py-6 text-lg rounded-2xl button-shimmer"
            >
              {item ? 'Update Item' : 'Create Item'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 py-6 text-lg rounded-2xl"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

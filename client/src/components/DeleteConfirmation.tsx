
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import type { Item } from '../../shared/schema';

interface DeleteConfirmationProps {
  item: Item;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmation({ item, onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-card frosted-glass rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-destructive/10 rounded-full">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Confirm Deletion
          </h2>
        </div>

        <p className="text-muted-foreground mb-6">
          Are you sure you want to delete <span className="font-semibold text-foreground">"{item.title}"</span>? 
          This action cannot be undone.
        </p>

        <div className="flex gap-4">
          <Button
            onClick={onConfirm}
            variant="destructive"
            className="flex-1 py-6 text-lg rounded-2xl"
          >
            Delete
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 py-6 text-lg rounded-2xl"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

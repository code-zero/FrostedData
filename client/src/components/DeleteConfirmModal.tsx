import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Item } from "@shared/schema";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  item: Item | null;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export default function DeleteConfirmModal({ 
  isOpen, 
  item, 
  onConfirm, 
  onCancel, 
  isDeleting = false 
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Delete Item
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-700 mb-2">
            Are you sure you want to delete this item?
          </p>
          {item && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-medium text-gray-900" data-testid="text-delete-item-title">
                {item.title}
              </p>
              {item.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => {
              console.log('Delete cancelled');
              onCancel();
            }}
            className="flex-1"
            disabled={isDeleting}
            data-testid="button-cancel-delete"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              console.log('Delete confirmed');
              onConfirm();
            }}
            className="flex-1"
            disabled={isDeleting}
            data-testid="button-confirm-delete"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
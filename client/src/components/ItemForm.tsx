import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save, Plus } from "lucide-react";
import { Item, InsertItem } from "@shared/schema";

interface ItemFormProps {
  item?: Item;
  onSave: (item: InsertItem) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export default function ItemForm({ item, onSave, onCancel, isEdit = false }: ItemFormProps) {
  const [formData, setFormData] = useState<InsertItem>({
    title: item?.title || '',
    description: item?.description || '',
    category: item?.category || '',
    status: item?.status || 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onSave(formData);
  };

  const handleInputChange = (field: keyof InsertItem, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border border-gray-200/50 bg-white/90 backdrop-blur-md shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            {isEdit ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            {isEdit ? 'Edit Item' : 'Create New Item'}
          </CardTitle>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              console.log('Cancel form');
              onCancel();
            }}
            className="h-8 w-8 text-gray-500 hover:text-gray-700"
            data-testid="button-cancel-form"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter item title..."
              className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20"
              data-testid="input-title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter item description..."
              rows={4}
              className="bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20 resize-none"
              data-testid="textarea-description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
                data-testid="select-category"
              >
                <SelectTrigger className="bg-white/50 border-gray-200 focus:border-primary">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                Status *
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
                data-testid="select-status"
              >
                <SelectTrigger className="bg-white/50 border-gray-200 focus:border-primary">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-2.5"
              data-testid="button-save"
            >
              <Save className="h-4 w-4 mr-2" />
              {isEdit ? 'Update Item' : 'Create Item'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                console.log('Cancel clicked');
                onCancel();
              }}
              className="px-6 py-2.5"
              data-testid="button-cancel"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
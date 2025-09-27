import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar } from "lucide-react";
import { Item } from "@shared/schema";
import { format } from "date-fns";

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

export default function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'personal': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'health': return 'bg-pink-100 text-pink-800 hover:bg-pink-200';
      case 'finance': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card 
      className="hover-elevate transition-all duration-300 border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-sm" 
      data-testid={`card-item-${item.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 
              className="font-semibold text-lg text-gray-900 truncate" 
              data-testid={`text-title-${item.id}`}
            >
              {item.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                className={`text-xs font-medium ${getCategoryColor(item.category)}`}
                data-testid={`badge-category-${item.id}`}
              >
                {item.category}
              </Badge>
              <Badge 
                className={`text-xs font-medium ${getStatusColor(item.status)}`}
                data-testid={`badge-status-${item.id}`}
              >
                {item.status}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                console.log('Edit item:', item.id);
                onEdit(item);
              }}
              className="h-8 w-8 text-gray-500 hover:text-primary"
              data-testid={`button-edit-${item.id}`}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                console.log('Delete item:', item.id);
                onDelete(item.id);
              }}
              className="h-8 w-8 text-gray-500 hover:text-destructive"
              data-testid={`button-delete-${item.id}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {item.description && (
        <CardContent className="pt-0">
          <p 
            className="text-gray-600 text-sm leading-relaxed line-clamp-3"
            data-testid={`text-description-${item.id}`}
          >
            {item.description}
          </p>
          {item.createdAt && (
            <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span data-testid={`text-date-${item.id}`}>
                {format(new Date(item.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
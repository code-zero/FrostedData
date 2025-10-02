
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useDesign } from '../contexts/DesignContext';
import type { Item } from '../../shared/schema';

interface ItemListProps {
  items: Item[];
  onAddNew: () => void;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const categoryColors = {
  work: 'bg-blue-500',
  personal: 'bg-purple-500',
  health: 'bg-green-500',
  finance: 'bg-yellow-500',
  education: 'bg-pink-500',
  travel: 'bg-cyan-500'
};

const statusColors = {
  pending: 'bg-gray-500',
  active: 'bg-blue-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-500'
};

export function ItemList({ items, onAddNew, onEdit, onDelete }: ItemListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { design } = useDesign();

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gridClass = design === 'compact' 
    ? 'space-y-3' 
    : design === 'luxury'
    ? 'grid grid-cols-1 lg:grid-cols-2 gap-6'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-card frosted-glass border border-border rounded-2xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          />
        </div>
        <Button
          onClick={onAddNew}
          className="w-full sm:w-auto py-6 px-8 text-lg rounded-2xl shimmer-glow"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Item
        </Button>
      </div>

      {/* Items Grid/List */}
      <div className={gridClass}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-card frosted-glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-shimmer ${
              design === 'luxury' ? 'shimmer' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground flex-1 mr-2">
                {item.title}
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(item)}
                  className="rounded-xl hover:bg-primary/10"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(item)}
                  className="rounded-xl hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-muted-foreground mb-4 line-clamp-2">
              {item.description}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`${categoryColors[item.category]} text-white`}>
                {item.category}
              </Badge>
              <Badge className={`${statusColors[item.status]} text-white`}>
                {item.status}
              </Badge>
              <span className="text-xs text-muted-foreground ml-auto">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-card frosted-glass rounded-2xl">
          <p className="text-muted-foreground text-lg">No items found</p>
        </div>
      )}
    </div>
  );
}

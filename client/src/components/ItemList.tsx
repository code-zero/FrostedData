import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Grid, List } from "lucide-react";
import ItemCard from './ItemCard';
import { Item } from "@shared/schema";

interface ItemListProps {
  items: Item[];
  onAddNew: () => void;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function ItemList({ items, onAddNew, onEdit, onDelete, isLoading = false }: ItemListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(items.map(item => item.category)));
  const statuses = Array.from(new Set(items.map(item => item.status)));

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <Card className="border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                My Items
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {filteredItems.length} of {items.length} items
              </p>
            </div>
            <Button
              onClick={() => {
                console.log('Add new item clicked');
                onAddNew();
              }}
              className="bg-primary hover:bg-primary/90 text-white font-medium shrink-0"
              data-testid="button-add-new"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  console.log('Search:', e.target.value);
                }}
                className="pl-10 bg-white/50 border-gray-200 focus:border-primary focus:ring-primary/20"
                data-testid="input-search"
              />
            </div>
            
            <div className="flex gap-2">
              <Select
                value={filterCategory}
                onValueChange={(value) => {
                  setFilterCategory(value);
                  console.log('Filter by category:', value);
                }}
              >
                <SelectTrigger className="w-40 bg-white/50 border-gray-200" data-testid="select-filter-category">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filterStatus}
                onValueChange={(value) => {
                  setFilterStatus(value);
                  console.log('Filter by status:', value);
                }}
              >
                <SelectTrigger className="w-36 bg-white/50 border-gray-200" data-testid="select-filter-status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setViewMode(viewMode === 'grid' ? 'list' : 'grid');
                  console.log('View mode changed to:', viewMode === 'grid' ? 'list' : 'grid');
                }}
                className="text-gray-500 hover:text-primary"
                data-testid="button-toggle-view"
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid/List */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="animate-pulse border border-gray-200/50 bg-white/80">
                <CardHeader className="pb-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex gap-2 mt-2">
                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                    <div className="h-5 bg-gray-200 rounded w-14"></div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <Card className="border border-gray-200/50 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
                  ? 'No items match your search' 
                  : 'No items yet'
                }
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Get started by creating your first item'
                }
              </p>
              <Button
                onClick={() => {
                  console.log('Add first item clicked');
                  onAddNew();
                }}
                className="bg-primary hover:bg-primary/90 text-white"
                data-testid="button-add-first"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Item
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
              >
                <ItemCard
                  item={item}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
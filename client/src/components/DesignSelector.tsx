import { Palette, Grid, Layout, Minimize2, Crown, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useDesign, DesignVariant } from "./DesignProvider";

const designOptions = [
  {
    id: "classic" as DesignVariant,
    name: "Classic",
    description: "Traditional card layout with frosted glass",
    icon: LayoutGrid,
  },
  {
    id: "minimal" as DesignVariant,
    name: "Minimal",
    description: "Clean and simple design",
    icon: Minimize2,
  },
  {
    id: "modern" as DesignVariant,
    name: "Modern",
    description: "Contemporary with bold accents",
    icon: Grid,
  },
  {
    id: "compact" as DesignVariant,
    name: "Compact",
    description: "Space-efficient list view",
    icon: Layout,
  },
  {
    id: "luxury" as DesignVariant,
    name: "Luxury",
    description: "Premium with enhanced effects",
    icon: Crown,
  },
];

export function DesignSelector() {
  const { design, setDesign } = useDesign();
  const currentDesign = designOptions.find(option => option.id === design);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="shimmer-glow gap-2"
          data-testid="button-design-selector"
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Design:</span>
          <Badge variant="secondary" className="hidden sm:inline">
            {currentDesign?.name}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="frosted-glass w-64">
        {designOptions.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem 
              key={option.id}
              onClick={() => setDesign(option.id)}
              className={`p-3 ${design === option.id ? "bg-accent" : ""}`}
              data-testid={`design-${option.id}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="h-4 w-4 mt-1 text-primary" />
                <div className="flex flex-col">
                  <span className="font-medium">{option.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
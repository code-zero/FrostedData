
import { Palette } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Badge } from "./ui/badge"
import { useDesign } from "../contexts/DesignContext"

const designs = [
  { id: "classic", name: "Classic", description: "Traditional card layout" },
  { id: "minimal", name: "Minimal", description: "Clean and simple design" },
  { id: "modern", name: "Modern", description: "Contemporary with bold accents" },
  { id: "compact", name: "Compact", description: "Space-efficient list view" },
  { id: "luxury", name: "Luxury", description: "Premium with enhanced effects" },
] as const

export function DesignSelector() {
  const { design, setDesign } = useDesign()
  const currentDesign = designs.find((d) => d.id === design)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2" data-testid="button-design-selector">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Design:</span>
          <Badge variant="secondary" className="hidden sm:inline">
            {currentDesign?.name}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="frosted-glass w-64">
        {designs.map((d) => (
          <DropdownMenuItem
            key={d.id}
            onClick={() => setDesign(d.id)}
            className={`p-3 ${design === d.id ? "bg-accent" : ""}`}
            data-testid={`design-${d.id}`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{d.name}</span>
              <span className="text-xs text-muted-foreground">{d.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

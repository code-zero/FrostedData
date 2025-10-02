
import { ThemeToggle } from '../components/ThemeToggle';
import { DesignSelector } from '../components/DesignSelector';

export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-foreground mb-2">FrostedData</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Beautiful data management with frosted glass effects and smooth animations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DesignSelector />
        </div>
      </div>
      <div className="text-center py-12">
        <p className="text-muted-foreground">Your application is now running with dark mode toggle and design selector!</p>
      </div>
    </div>
  );
}


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch } from 'wouter';
import { ThemeProvider } from './contexts/ThemeContext';
import { DesignProvider } from './contexts/DesignContext';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="frosteddata-ui-theme">
        <DesignProvider defaultDesign="classic" storageKey="frosteddata-design-variant">
          <div className="min-h-screen bg-background">
            <Toaster />
            <Switch>
              <Route path="/" component={HomePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </DesignProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

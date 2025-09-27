import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DesignProvider } from "@/components/DesignProvider";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="frosteddata-ui-theme">
        <DesignProvider defaultDesign="classic" storageKey="frosteddata-design-variant">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </DesignProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

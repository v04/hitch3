import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/hooks/use-role";
import OnboardingPage from "@/pages/onboarding";
import HomePage from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={OnboardingPage} />
      <Route path="/home" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RoleProvider>
          <div className="max-w-sm mx-auto bg-white shadow-2xl min-h-screen relative">
            <Toaster />
            <Router />
          </div>
        </RoleProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

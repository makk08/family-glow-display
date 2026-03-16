import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TabNavigation from "@/components/dashboard/TabNavigation";

import Index from "./pages/Index";
import Inventar from "./pages/Inventar";
import NotFound from "./pages/NotFound";
import SpotifyCallback from "./pages/SpotifyCallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <div className="flex h-svh flex-col bg-background p-8 text-foreground">

          <div className="mb-6 flex justify-center">
            <TabNavigation />
          </div>

          <div className="min-h-0 flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/inventar" element={<Inventar />} />
              <Route path="/callback" element={<SpotifyCallback />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

        </div>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { authService } from "@/api/auth";
import Index from "./pages/Index";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CategoryDetails from "./pages/CategoryDetails";
import Families from "./pages/Families";
import FamilyDetails from "./pages/FamilyDetails";
import NotFound from "./pages/NotFound";
import { FloatingMenu } from "./components/FloatingMenu";
import { AddMealModal } from "./components/AddMealModal";
import { MiBotonMini } from "./components/MiBotonMini";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);

  // Show FAB only when user is authenticated and not on /families routes
  const isAuthenticated = authService.isAuthenticated();
  const showFAB = isAuthenticated && !location.pathname.startsWith("/families");

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/index" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<Blog />} />
        <Route path="/community/:slug" element={<BlogPost />} />
        {/* Legacy redirects */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/category/:method" element={<CategoryDetails />} />
        <Route path="/families" element={<Families />} />
        <Route path="/families/:id" element={<FamilyDetails />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showFAB && (
        <FloatingMenu onOpenNutrition={() => setIsMealModalOpen(true)} />
      )}

      <AddMealModal
        open={isMealModalOpen}
        onClose={() => setIsMealModalOpen(false)}
      />

      {/* Minimal, casi escondido, visible en todas las páginas */}
      <MiBotonMini />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

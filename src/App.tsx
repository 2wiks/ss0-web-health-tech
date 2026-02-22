import { Suspense, lazy, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { authService } from "@/api/auth";
import { isDev } from "@/utils/env";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Docs from "./pages/Docs";
import ReleaseDoc from "./pages/ReleaseDoc";
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
import { ThemeProvider } from "./components/ThemeProvider";
import { GlobalLayout } from "./components/GlobalLayout";

import Kitchen from "./pages/Kitchen";

const queryClient = new QueryClient();
const SandboxPage = isDev ? lazy(() => import("./pages/Sandbox")) : null;

function AppContent() {
  const location = useLocation();
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);

  // Show FAB only when user is authenticated and not on /families routes
  const isAuthenticated = authService.isAuthenticated();
  const showFAB = isAuthenticated && !location.pathname.startsWith("/families");

  return (
    <>
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/index" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/releases/:type/:version" element={<ReleaseDoc />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Blog />} />
          <Route path="/community/:slug" element={<BlogPost />} />
          {/* Legacy redirects */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/category/:method" element={<CategoryDetails />} />
          <Route path="/families" element={<Families />} />
          <Route path="/families/:id" element={<FamilyDetails />} />
          <Route path="/kitchen" element={<Kitchen />} />
          {isDev && SandboxPage && (
            <Route
              path="/sandbox"
              element={
                <Suspense fallback={null}>
                  <SandboxPage />
                </Suspense>
              }
            />
          )}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalLayout>

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
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { isDev } from "@/utils/env";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Docs from "./pages/Docs";
import ReleaseDoc from "./pages/ReleaseDoc";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Interest from "./pages/Interest";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import { GlobalLayout } from "./components/GlobalLayout";

const queryClient = new QueryClient();
const SandboxPage = isDev ? lazy(() => import("./pages/Sandbox")) : null;

function AppContent() {
  return (
    <GlobalLayout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/index" element={<Index />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/releases/:type/:version" element={<ReleaseDoc />} />
        <Route path="/community" element={<Blog />} />
        <Route path="/community/:slug" element={<BlogPost />} />
        <Route path="/interes" element={<Interest />} />
        {/* Legacy redirects */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
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

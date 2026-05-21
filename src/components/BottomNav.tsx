import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

export function BottomNav() {
  return (
    <PageContainer
      className="py-4"
      style={{ paddingBottom: `calc(1rem + env(safe-area-inset-bottom))` }}
    >
      <nav
        className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-muted-foreground"
        aria-label="Primary navigation"
      >
        <Link
          to="/docs"
          className="hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
        >
          Docs
        </Link>
        <Link
          to="/community"
          className="hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
        >
          Community
        </Link>
        <Link
          to="/interes"
          aria-label="¿Te interesa Sense?"
          className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/80 px-5 py-2 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-[1.04] hover:shadow-xl hover:shadow-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-pulse"
          />
          <Sparkles className="h-4 w-4" />
          ¿Te interesa Sense?
        </Link>
      </nav>
    </PageContainer>
  );
}

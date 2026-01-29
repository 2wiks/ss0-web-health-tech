import { Link } from "react-router-dom";
import { PageContainer } from "@/components/layout/page-container";

export function BottomNav() {
  return (
    <PageContainer
      className="py-4"
      style={{ paddingBottom: `calc(1rem + env(safe-area-inset-bottom))` }}
    >
      <nav
        className="flex justify-center gap-8 text-sm text-muted-foreground"
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
          to="/login"
          className="hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
        >
          Login
        </Link>
      </nav>
    </PageContainer>
  );
}

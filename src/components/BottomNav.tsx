import { Link } from "react-router-dom";

export function BottomNav() {
  return (
    <nav
      className="flex justify-center gap-8 pb-10 text-sm text-muted-foreground"
      aria-label="Bottom navigation"
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
  );
}

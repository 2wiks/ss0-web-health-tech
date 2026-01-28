import logoLight from "@/assets/hacking-health-logo.png";
import logoDark from "@/assets/hacking-health-logo-dark.png";
import { Link } from "react-router-dom";

type AppLogoProps = {
  className?: string;
  alt?: string;
};

export function AppLogo({ className = "h-14 w-auto", alt = "Hacking Health" }: AppLogoProps) {
  return (
    <Link
      to="/"
      aria-label="Go to home"
      className="inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="inline-block">
        <img src={logoLight} alt={alt} className={`${className} dark:hidden`} />
        <img src={logoDark} alt={alt} className={`${className} hidden dark:block`} />
      </span>
    </Link>
  );
}

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const THEME_PREFERENCE_KEY = "theme-preference";

export function MiBotonMini() {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from DOM immediately
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    // Sync initial state with DOM
    setIsDark(document.documentElement.classList.contains("dark"));

    // Listen for class changes (in case other code toggles it)
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleToggle = () => {
    const root = document.documentElement;
    const currentlyDark = root.classList.contains("dark");
    const willBeDark = !currentlyDark;

    // Apply the change
    if (willBeDark) {
      root.classList.add("dark");
      localStorage.setItem(THEME_PREFERENCE_KEY, "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem(THEME_PREFERENCE_KEY, "light");
    }

    // Update local state
    setIsDark(willBeDark);

    // Dispatch custom event to notify the auto-theme system
    window.dispatchEvent(new Event("theme-change"));
  };

  return (
    <div className="fixed bottom-3 left-3 z-40">
      <Button
        variant="black"
        aria-label="Alternar modo oscuro/claro"
        aria-pressed={isDark}
        onClick={handleToggle}
        className="h-7 w-7 p-0 rounded-full opacity-20 hover:opacity-80 transition-opacity text-xs"
      >
        {isDark ? "☾" : "☀"}
      </Button>
    </div>
  );
}

export default MiBotonMini;



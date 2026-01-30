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
    <div className="fixed bottom-6 left-6 z-40">
      <Button
        variant="black"
        aria-label="Alternar modo oscuro/claro"
        aria-pressed={isDark}
        onClick={handleToggle}
        className="theme-toggle-sparkle h-10 w-10 p-0 rounded-full text-xs bg-white text-black dark:bg-black dark:text-white ring-2 ring-slate-200/90 transition-transform duration-200 hover:bg-white dark:hover:bg-black"
      >
        {isDark ? "☾" : "☀"}
      </Button>
    </div>
  );
}

export default MiBotonMini;



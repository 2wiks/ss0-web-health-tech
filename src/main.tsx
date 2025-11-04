import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const THEME_PREFERENCE_KEY = "theme-preference";

export function applyTheme() {
  // Check for manual preference first
  const preference = localStorage.getItem(THEME_PREFERENCE_KEY);
  const root = document.documentElement;
  
  if (preference === "dark") {
    root.classList.add("dark");
    return;
  }
  if (preference === "light") {
    root.classList.remove("dark");
    return;
  }
  
  // No manual preference: apply time-based auto theme
  const hour = new Date().getHours();
  const isDarkHours = hour >= 19 || hour < 7; // 7pm–7am
  if (isDarkHours) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function initAutoTheme() {
  // Initial apply
  applyTheme();
  
  // Re-check every minute in case tab stays open
  const intervalId = window.setInterval(applyTheme, 60 * 1000);
  
  // Update when tab becomes visible again
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) applyTheme();
  });
  
  // Listen for manual theme changes from the toggle button
  window.addEventListener("storage", (e) => {
    if (e.key === THEME_PREFERENCE_KEY) {
      applyTheme();
    }
  });
  
  // Custom event for same-tab changes
  window.addEventListener("theme-change", () => {
    applyTheme();
  });
  
  // Cleanup on HMR disposal
  if (import.meta && (import.meta as any).hot) {
    (import.meta as any).hot.dispose(() => {
      window.clearInterval(intervalId);
    });
  }
}

initAutoTheme();

createRoot(document.getElementById("root")!).render(<App />);

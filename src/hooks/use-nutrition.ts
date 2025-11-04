import { useState, useEffect } from "react";

interface MealData {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  description?: string;
  timestamp: string;
}

/**
 * Hook to access cached meals and listen for new meal additions
 * Usage in nutrition tracking components:
 * 
 * const { recentMeals, refreshMeals } = useNutrition();
 * 
 * useEffect(() => {
 *   // Component will auto-refresh when a new meal is added
 * }, [recentMeals]);
 */
export function useNutrition() {
  const [recentMeals, setRecentMeals] = useState<MealData[]>([]);

  const loadMeals = () => {
    try {
      const stored = localStorage.getItem("recentMeals");
      if (stored) {
        setRecentMeals(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading meals from localStorage:", error);
    }
  };

  useEffect(() => {
    // Load meals on mount
    loadMeals();

    // Listen for new meal additions
    const handleMealAdded = (event: Event) => {
      const customEvent = event as CustomEvent<MealData>;
      console.log("New meal added:", customEvent.detail);
      loadMeals(); // Reload from localStorage to stay in sync
    };

    window.addEventListener("mealAdded", handleMealAdded);

    return () => {
      window.removeEventListener("mealAdded", handleMealAdded);
    };
  }, []);

  const clearMeals = () => {
    localStorage.removeItem("recentMeals");
    setRecentMeals([]);
  };

  return {
    recentMeals,
    refreshMeals: loadMeals,
    clearMeals,
  };
}

/**
 * Get today's meals from the cached data
 */
export function getTodaysMeals(meals: MealData[]): MealData[] {
  const today = new Date().toDateString();
  return meals.filter((meal) => {
    const mealDate = new Date(meal.timestamp).toDateString();
    return mealDate === today;
  });
}

/**
 * Calculate total nutrition for a set of meals
 */
export function calculateTotalNutrition(meals: MealData[]) {
  return meals.reduce(
    (total, meal) => ({
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fat: total.fat + meal.fat,
      calories: total.calories + meal.calories,
    }),
    { protein: 0, carbs: 0, fat: 0, calories: 0 }
  );
}


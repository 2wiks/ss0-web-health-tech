import { useState } from "react";
import { Plus, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingMenuProps {
  onOpenNutrition: () => void;
}

export function FloatingMenu({ onOpenNutrition }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Nutrition button - appears when menu is open */}
      <div
        className={cn(
          "transition-all duration-200 ease-out",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <Button
          size="lg"
          className="rounded-full shadow-lg bg-green-600 hover:bg-green-700 h-14 w-14 p-0"
          onClick={() => {
            onOpenNutrition();
            setIsOpen(false);
          }}
          title="Add meal"
        >
          <Utensils className="h-6 w-6" />
        </Button>
      </div>

      {/* Main FAB button */}
      <Button
        size="lg"
        className={cn(
          "rounded-full shadow-xl h-16 w-16 p-0 transition-transform duration-200",
          isOpen && "rotate-45"
        )}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close menu" : "Open menu"}
      >
        <Plus className="h-7 w-7" />
      </Button>
    </div>
  );
}


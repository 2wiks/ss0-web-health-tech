import { useState, useRef } from "react";
import { Camera, Loader2, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/api";

interface NutritionInfo {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

interface AddMealModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddMealModal({ open, onClose }: AddMealModalProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [nutrition, setNutrition] = useState<NutritionInfo | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setNutrition(null); // Reset nutrition when new image is selected
      setIsManualMode(false); // Switch to photo mode
    }
  };

  const handleManualMode = () => {
    setIsManualMode(true);
    setImage(null);
    setImagePreview(null);
    setNutrition({
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
    });
  };

  const handleAnalyze = async () => {
    if (!image) {
      toast({
        title: "No image selected",
        description: "Please upload or take a photo first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("image", image);
    if (description) {
      formData.append("description", description);
    }

    try {
      const response = await api.post<NutritionInfo>("/extract-info/analyze-food", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNutrition(response.data);
      toast({
        title: "Analysis complete",
        description: "Food analyzed successfully. Review the nutrition info below.",
      });
    } catch (error) {
      console.error("Error analyzing food:", error);
      toast({
        title: "Analysis failed",
        description: "Could not analyze the food image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async () => {
    if (!nutrition) {
      toast({
        title: "No nutrition data",
        description: "Please analyze a photo or enter nutrition values manually",
        variant: "destructive",
      });
      return;
    }

    // Validate that at least one nutrition value is greater than 0
    if (nutrition.protein === 0 && nutrition.carbs === 0 && nutrition.fat === 0 && nutrition.calories === 0) {
      toast({
        title: "Invalid nutrition data",
        description: "Please enter at least one nutrition value greater than 0",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Format data according to backend API specification
      const mealData = {
        carbohydrates: nutrition.carbs,
        protein: nutrition.protein,
        fat: nutrition.fat,
        calories: nutrition.calories,
        timestamp: new Date().toISOString(),
      };

      await api.post("/nutrition/add-meal", mealData);

      // Create a separate object for localStorage that includes description
      const localStorageData = {
        ...mealData,
        description,
        carbs: nutrition.carbs, // Keep original field for compatibility
      };

      // Persist to localStorage for caching
      const storedMeals = JSON.parse(localStorage.getItem("recentMeals") || "[]");
      storedMeals.unshift(localStorageData);
      // Keep only the last 10 meals
      localStorage.setItem("recentMeals", JSON.stringify(storedMeals.slice(0, 10)));

      // Dispatch custom event to notify any listening components
      window.dispatchEvent(new CustomEvent("mealAdded", { detail: localStorageData }));

      toast({
        title: "Meal saved",
        description: "Your meal has been recorded successfully.",
      });

      // Reset form and close
      handleClose();
    } catch (error) {
      console.error("Error saving meal:", error);
      toast({
        title: "Save failed",
        description: "Could not save the meal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setImage(null);
    setImagePreview(null);
    setDescription("");
    setNutrition(null);
    setIsAnalyzing(false);
    setIsSaving(false);
    setIsManualMode(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Meal Entry</DialogTitle>
          <DialogDescription>
            {isManualMode 
              ? "Enter nutrition information manually" 
              : "Upload a photo to analyze or enter nutrition data manually"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Mode Selection */}
          {!isManualMode && !nutrition && (
            <div className="space-y-2">
              <Label>Choose method</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleManualMode}
                >
                  ✏️ Manual Entry
                </Button>
              </div>
            </div>
          )}

          {/* Image Upload Section - Only show when not in manual mode */}
          {!isManualMode && (
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              {imagePreview && (
                <div className="mt-2 rounded-lg overflow-hidden border">
                  <img
                    src={imagePreview}
                    alt="Food preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Description Section */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your meal..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          {/* Analyze Button - Only show when there's an image and not in manual mode */}
          {!nutrition && !isManualMode && image && (
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Food"
              )}
            </Button>
          )}

          {/* Nutrition Results - Editable */}
          {nutrition && (
            <div className="space-y-4 rounded-lg border bg-muted/50 p-4">
              <h3 className="font-semibold text-sm">Nutritional Information</h3>
              <p className="text-xs text-muted-foreground">
                {isManualMode 
                  ? "Enter the nutrition values for your meal"
                  : "Review and adjust the values before saving"
                }
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Protein Input */}
                <div className="space-y-2">
                  <Label htmlFor="protein" className="text-xs">
                    Protein (g)
                  </Label>
                  <Input
                    id="protein"
                    type="number"
                    min="0"
                    step="0.1"
                    value={nutrition.protein}
                    onChange={(e) =>
                      setNutrition({
                        ...nutrition,
                        protein: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="h-9"
                  />
                </div>

                {/* Carbs Input */}
                <div className="space-y-2">
                  <Label htmlFor="carbs" className="text-xs">
                    Carbs (g)
                  </Label>
                  <Input
                    id="carbs"
                    type="number"
                    min="0"
                    step="0.1"
                    value={nutrition.carbs}
                    onChange={(e) =>
                      setNutrition({
                        ...nutrition,
                        carbs: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="h-9"
                  />
                </div>

                {/* Fat Input */}
                <div className="space-y-2">
                  <Label htmlFor="fat" className="text-xs">
                    Fat (g)
                  </Label>
                  <Input
                    id="fat"
                    type="number"
                    min="0"
                    step="0.1"
                    value={nutrition.fat}
                    onChange={(e) =>
                      setNutrition({
                        ...nutrition,
                        fat: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="h-9"
                  />
                </div>

                {/* Calories Input */}
                <div className="space-y-2">
                  <Label htmlFor="calories" className="text-xs">
                    Calories (kcal)
                  </Label>
                  <Input
                    id="calories"
                    type="number"
                    min="0"
                    step="1"
                    value={nutrition.calories}
                    onChange={(e) =>
                      setNutrition({
                        ...nutrition,
                        calories: parseInt(e.target.value) || 0,
                      })
                    }
                    className="h-9"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-2">
                {isManualMode && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsManualMode(false);
                      setNutrition(null);
                    }}
                    className="flex-1"
                  >
                    ← Back to Photo
                  </Button>
                )}
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={isManualMode ? "flex-1" : "w-full"}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Meal"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


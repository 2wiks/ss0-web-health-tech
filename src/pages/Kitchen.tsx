import React, { useEffect, useState } from "react";
import { userService } from "@/api/user";
import { kitchenService, InventoryItem, RecipeResponse } from "@/api/kitchen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, ChefHat } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Kitchen = () => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
  });
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const fetchUserAndInventory = async () => {
      try {
        const user = await userService.getCurrentUser();
        setUserId(user.id);
        const items = await kitchenService.getInventory(user.id);
        setInventory(items);
      } catch (error) {
        console.error("Failed to load kitchen data", error);
        toast({
          title: "Error",
          description: "Failed to load kitchen data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndInventory();
  }, [toast]);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      await kitchenService.addInventoryItem({
        ...newItem,
        quantity: Number.parseFloat(newItem.quantity),
        user_id: userId,
      });
      const items = await kitchenService.getInventory(userId);
      setInventory(items);
      setNewItem({ name: "", category: "", quantity: "", unit: "" });
      toast({
        title: "Success",
        description: "Item added to inventory.",
      });
    } catch (error) {
      console.error("Failed to add item", error);
      toast({
        title: "Error",
        description: "Failed to add item.",
        variant: "destructive",
      });
    }
  };

  const handleSuggestRecipe = async () => {
    if (!userId) return;
    setRecipeLoading(true);
    setRecipe(null);
    try {
      const suggestion = await kitchenService.suggestRecipe(userId, {
        prompt: prompt || undefined,
      });
      setRecipe(suggestion);
    } catch (error) {
      console.error("Failed to suggest recipe", error);
      toast({
        title: "Error",
        description: "Failed to generate recipe suggestion.",
        variant: "destructive",
      });
    } finally {
      setRecipeLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8 pb-20">
      <h1 className="text-3xl font-bold">My Kitchen</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inventory Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <form onSubmit={handleAddItem} className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Item name"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      placeholder="Category"
                      value={newItem.category}
                      onChange={(e) =>
                        setNewItem({ ...newItem, category: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({ ...newItem, quantity: e.target.value })
                      }
                      required
                    />
                    <Input
                      placeholder="Unit (e.g., kg, pcs)"
                      value={newItem.unit}
                      onChange={(e) =>
                        setNewItem({ ...newItem, unit: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </form>

                <div className="border rounded-md divide-y mt-4">
                  {inventory.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No items in inventory. Add some!
                    </div>
                  ) : (
                    inventory.map((item, idx) => (
                      <div
                        key={item._id || idx}
                        className="p-3 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {item.quantity} {item.unit}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recipe Generator Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recipe Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Special requests (optional)</Label>
                  <Input
                    id="prompt"
                    placeholder="e.g., 'Something quick for lunch'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleSuggestRecipe}
                  className="w-full"
                  disabled={recipeLoading || inventory.length === 0}
                >
                  {recipeLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ChefHat className="mr-2 h-4 w-4" />
                  )}
                  Suggest Recipe
                </Button>

                {recipe && (
                  <div className="mt-6 border rounded-md p-4 bg-muted/20">
                    <h3 className="text-xl font-bold mb-2">
                      {recipe.dish_name}
                    </h3>
                    <div className="mb-2">
                      <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                        {recipe.meal_type}
                      </span>
                    </div>

                    <h4 className="font-semibold mt-4 mb-2">Ingredients:</h4>
                    <ul className="list-disc list-inside space-y-1 mb-4">
                      {recipe.ingredients_to_use.map((ing, idx) => (
                        <li key={idx}>
                          {ing.amount} {ing.name}
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-semibold mt-4 mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {recipe.preparation_steps.map((step, idx) => (
                        <li key={idx} className="text-sm">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Kitchen;

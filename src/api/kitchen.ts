import { authService } from './auth';

export interface InventoryItem {
    _id?: string;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    user_id: string;
}

export interface InventoryItemCreate {
    name: string;
    category: string;
    quantity: number;
    unit: string;
    user_id: string;
}

export interface RecipeRequest {
    prompt?: string;
    preferences?: string;
}

export interface RecipeIngredient {
    name: string;
    amount: string;
}

export interface RecipeResponse {
    dish_name: string;
    meal_type: string;
    ingredients_to_use: RecipeIngredient[];
    preparation_steps: string[];
}

export const kitchenService = {
    getInventory: async (userId: string) => {
        const response = await authService.getAxiosInstance().get<InventoryItem[]>('/kitchen/inventory', {
            params: { user_id: userId }
        });
        return response.data;
    },

    addInventoryItem: async (item: InventoryItemCreate) => {
        const response = await authService.getAxiosInstance().post('/kitchen/inventory', item);
        return response.data;
    },

    suggestRecipe: async (userId: string, request: RecipeRequest) => {
        const response = await authService.getAxiosInstance().post<RecipeResponse>('/kitchen/recipes/suggest', request, {
            params: { user_id: userId }
        });
        return response.data;
    }
};

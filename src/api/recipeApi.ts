import { IRecipe } from "../interface/IRecipe";
import { baseApi } from "./baseApi";

export async function getRecipes(queryParams: URLSearchParams) {
    if (queryParams == null) {
        return await baseApi.get("/api/recipes");
    }
    return await baseApi.get(`/api/recipes?${queryParams}`);
}

export async function getRecipeById(id: string) {
    return await baseApi.get(`/api/recipes/${id}`);
}

export async function saveRecipe(recipe: IRecipe) {
    const { name, ingredients, description } = recipe;
    const filteredIngredients = ingredients.filter(ingredient => ingredient.ingredientName !== "");

    return await baseApi.post(
        "/api/recipes/",
        {
            name: name,
            ingredients: filteredIngredients,
            description: description
        },
    );
}

export async function updateRecipe(recipe: IRecipe) {
    const { name, ingredients, description } = recipe;
    const filteredIngredients = ingredients.filter(ingredient => ingredient.ingredientName !== "");

    return await baseApi.put(
        `/api/recipes/${recipe._id}`,
        {
            name: name,
            ingredients: filteredIngredients,
            description: description
        },
    );
}

export async function deleteRecipe(id: string) {
    return await baseApi.delete(`/api/recipes/${id}`);
}
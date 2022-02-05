import { IRecipe } from "../interface/IRecipe";
import { baseApi } from "./baseApi";

export async function getRecipes() {
    return await baseApi.get("/api/recipes");
}

export async function getRecipeById(id: string) {
    return await baseApi.get(`/api/recipes/${id}`);
}

export async function saveRecipe(recipe: IRecipe) {
    return await baseApi.post(
        "/api/recipes/",
        {
            name: recipe.name,
            ingredients: recipe.ingredients,
            description: recipe.description
        },
    );
}

export async function updateRecipe(recipe: IRecipe) {
    return await baseApi.put(
        `/api/recipes/${recipe._id}`,
        {
            name: recipe.name,
            ingredients: recipe.ingredients,
            description: recipe.description
        },
    );
}

export async function deleteRecipe(id: string) {
    return await baseApi.delete(`/api/recipes/${id}`);
}
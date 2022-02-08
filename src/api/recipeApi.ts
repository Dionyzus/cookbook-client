import { IRecipe } from "../interface/IRecipe";
import { isNullOrEmpty } from "../util/stringUtil";
import { baseApi } from "./baseApi";

export async function getRecipes(queryParams: URLSearchParams) {
    if (queryParams == null || isNullOrEmpty(queryParams.get("text"))) {
        return await baseApi.get(`/api/recipes?${queryParams}`);
    }
    return await baseApi.get(`/api/recipes/search?${queryParams}`);
}

export async function getRecipeById(id: string) {
    return await baseApi.get(`/api/recipes/${id}`);
}

export async function saveRecipe(recipe: IRecipe) {
    const { name, ingredients, description } = recipe;
    const filteredIngredients = ingredients.filter(ingredient => ingredient.ingredient !== "");

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
    const filteredIngredients = ingredients.filter(ingredient => ingredient.ingredient !== "");

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
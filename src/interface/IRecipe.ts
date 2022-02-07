import { IIngredient } from "./IIngredient";

export interface IRecipe {
    _id: string;
    name: string;
    ingredients: IIngredient[];
    description: string;
}
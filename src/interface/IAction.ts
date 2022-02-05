import { IRecipe } from "./IRecipe";

export interface IAction {
    actionName: string;
    action: (recipe: IRecipe) => void
}
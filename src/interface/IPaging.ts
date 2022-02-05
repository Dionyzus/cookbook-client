import { IPager } from "./IPager";
import { IRecipe } from "./IRecipe";

export interface IPaging {
    pager: IPager;
    itemCollection: IRecipe[];
}
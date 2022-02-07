import { IIngredient } from "../interface/IIngredient";
import { IRecipe } from "../interface/IRecipe";

export function updateAndGetState(key: string, value: string, state: IRecipe, index: number) {
    if (key === "ingredient") {
        const { ingredients } = state;
        const updatedIngredient = {
            ingredient: value,
            amount: state.ingredients[index].amount,
        };
        return updateState(ingredients, index, updatedIngredient, state);
    } else if (key === "value") {
        const { ingredients } = state;
        const updatedIngredient = {
            ingredient: state.ingredients[index].ingredient,
            amount: {
                value: value,
                unit: state.ingredients[index].amount.unit
            }
        };
        return updateState(ingredients, index, updatedIngredient, state);
    } else {
        const { ingredients } = state;
        const updatedIngredient = {
            ingredient: state.ingredients[index].ingredient,
            amount: {
                value: state.ingredients[index].amount.value,
                unit: value
            }
        };
        return updateState(ingredients, index, updatedIngredient, state);
    }
}

function updateState(ingredients: IIngredient[], index: number, updatedIngredient: IIngredient, state: IRecipe) {
    ingredients[index] = updatedIngredient;
    const updatedState = {
        ...state,
        "ingredients": ingredients
    };
    return updatedState;
}


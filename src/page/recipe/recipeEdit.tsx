import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { updateRecipe } from '../../api/recipeApi';
import RecipeForm from '../../component/recipe/recipeForm';
import { IRecipe } from '../../interface/IRecipe';
import { updateAndGetState } from '../../util/formUtil';

export default function RecipeEdit() {

    const history = useHistory();
    const { state } = useLocation<IRecipe>();
    const [recipe, setRecipe] = useState<IRecipe>(state);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>, recipe: IRecipe) {
        event.preventDefault();
        await updateRecipe(recipe);
        history.push("/recipes");
    }

    function handleChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.currentTarget;
        setRecipe((previousState) => {
            return {
                ...previousState,
                [name]: value,
            };
        });
    }

    function handleIngredientChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        const { name, value } = event.currentTarget;
        const updatedState = updateAndGetState(name, value, recipe, index);
        setRecipe(updatedState);
    }

    function handleIngredientAmountChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        const { name, value } = event.currentTarget;
        const updatedState = updateAndGetState(name, value, recipe, index);
        setRecipe(updatedState);
    }

    return (
        <div>
            {
                <RecipeForm element={recipe}
                    onChangeHandler={handleChange}
                    onIngredientChangeHandler={handleIngredientChange}
                    onIngredientAmountChangeHandler={handleIngredientAmountChange}
                    onSubmitHandler={handleSubmit}
                    submitText='Update'></RecipeForm>
            }
        </div>
    )
}
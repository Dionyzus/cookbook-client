import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { updateRecipe } from '../../api/recipeApi';
import RecipeForm from '../../component/recipe/recipeForm';
import { IRecipe } from '../../interface/IRecipe';


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

    return (
        <>
            {
                <RecipeForm element={recipe} onChangeHandler={handleChange} onSubmitHandler={handleSubmit} submitText='update'></RecipeForm>
            }
        </>
    )
}
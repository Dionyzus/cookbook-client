import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { saveRecipe } from '../../api/recipeApi';
import RecipeForm from '../../component/recipe/recipeForm';
import { IRecipe } from '../../interface/IRecipe';


export default function RecipeAdd() {

    const history = useHistory();
    const [recipe, setRecipe] = useState<IRecipe>(
        { _id: "", name: "", ingredients: "", description: "" }
    );

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>, recipe: IRecipe) {
        event.preventDefault();
        await saveRecipe(recipe);
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
                <RecipeForm element={recipe} onChangeHandler={handleChange} onSubmitHandler={handleSubmit} submitText='save'></RecipeForm>
            }
        </>
    )
}
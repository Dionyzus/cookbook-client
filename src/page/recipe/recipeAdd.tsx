import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { saveRecipe } from '../../api/recipeApi';
import RecipeForm from '../../component/recipe/recipeForm';
import { IRecipe } from '../../interface/IRecipe';
import { updateAndGetState } from '../../util/formUtil';

export default function RecipeAdd() {

    const history = useHistory();
    const [recipe, setRecipe] = useState<IRecipe>(
        {
            _id: "",
            name: "",
            ingredients: [{
                ingredient: "",
                amount: {
                    value: 0,
                    unit: "g"
                },
            }
            ],
            description: ""
        }
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
        <>
            {
                <RecipeForm element={recipe} onChangeHandler={handleChange} onIngredientChangeHandler={handleIngredientChange} onIngredientAmountChangeHandler={handleIngredientAmountChange} onSubmitHandler={handleSubmit} submitText='save'></RecipeForm>
            }
        </>
    )
}
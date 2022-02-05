import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import RecipeDetails from '../../component/recipe/recipeDetails';
import { IRecipe } from '../../interface/IRecipe';

export default function RecipeView() {

    const history = useHistory();
    const { state } = useLocation<IRecipe>();
    const { index } = useParams<{ index: string }>();

    function handleEditRecipe(recipe: IRecipe) {
        history.push({
            pathname: `/recipes/edit/${index}`,
            state: recipe
        });
    }

    return (
        <>
            <RecipeDetails element={state} actions={[
                {
                    action: () => handleEditRecipe(state),
                    actionName: 'edit'
                }
            ]} />
        </>
    );
}
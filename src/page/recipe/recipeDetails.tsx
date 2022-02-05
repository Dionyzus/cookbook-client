import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import Recipe from '../../component/recipe/recipe';
import { IRecipe } from '../../interface/IRecipe';

export default function RecipeDetails() {

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
            <table>
                <tbody>
                    <Recipe index={null} element={state} actions={[
                        {
                            action: () => handleEditRecipe(state),
                            actionName: 'edit'
                        }
                    ]} />
                </tbody>
            </table>
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { deleteRecipe, getRecipes } from '../../api/recipeApi';
import Recipe from '../../component/recipe/recipe';
import { IRecipe } from '../../interface/IRecipe';

export default function RecipeCollection() {

    const [recipeCollection, setRecipeCollection] = useState<IRecipe[]>();
    const history = useHistory();

    useEffect(() => {
        async function getRecipeCollection() {
            const result = await getRecipes();
            if (result && result.data) {
                setRecipeCollection(result.data);
            }
        }
        getRecipeCollection();
    }, [setRecipeCollection]);

    function handleViewRecipeDetails(recipe: IRecipe, index: number) {
        history.push({
            pathname: `/recipes/view/${index}`,
            state: recipe
        });
    }

    function handleEditRecipe(recipe: IRecipe, index: number) {
        history.push({
            pathname: `/recipes/edit/${index}`,
            state: recipe
        });
    }

    async function handleDeleteRecipe(recipe: IRecipe, index: number) {
        if (recipeCollection == null) {
            return;
        }
        try {
            await deleteRecipe(recipe._id);
            const dataCopy = [...recipeCollection];
            dataCopy.splice(index, 1);
            setRecipeCollection(dataCopy);
        } catch (error) {
            console.log("An error has occurred: " + error);
        }
    }

    function handleAddNew() {
        history.push(`/recipes/new`);
    }

    return (
        <>
            {
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Ingredients</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {
                        recipeCollection != null && recipeCollection.map((el: IRecipe, index: number) =>
                            <tbody key={el._id}>
                                <Recipe index={index} element={el} actions={[
                                    {
                                        action: () => handleViewRecipeDetails(el, index),
                                        actionName: 'view'
                                    },
                                    {
                                        action: () => handleEditRecipe(el, index),
                                        actionName: 'edit'
                                    },
                                    {
                                        action: () => handleDeleteRecipe(el, index),
                                        actionName: 'delete'
                                    }
                                ]} />
                            </tbody>
                        )}
                </table>
            }
            <>
                <button onClick={handleAddNew}
                    color="primary">new
                </button>
            </>
        </>
    );
}
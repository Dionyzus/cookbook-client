import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { deleteRecipe } from "../api/recipeApi";
import { IPager } from "../interface/IPager";
import { IRecipe } from "../interface/IRecipe";
import RecipeTableRow from "./recipe/recipeTableRow";
import Pagination from "./pagination";

interface IProps {
    pager: IPager;
    data: IRecipe[];
    collectionSize: number;
    elementsPerPage: number;
}

export default function Table(props: IProps) {
    const history = useHistory();
    const { data, pager } = props;
    const [updatedData, setUpdatedData] = useState<IRecipe[]>(data);

    useEffect(() => {
        setUpdatedData(data);
    }, [data]);

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
        if (updatedData == null) {
            return;
        }
        try {
            await deleteRecipe(recipe._id);
            const dataCopy = [...updatedData];
            dataCopy.splice(index, 1);
            setUpdatedData(dataCopy);
        } catch (error) {
            console.log("An error has occurred: " + error);
        }
    }

    return (
        <>
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
                <tbody>
                    {updatedData != null && updatedData.map((el: IRecipe, index: number) =>
                        <tr key={el._id}>
                            <RecipeTableRow index={index} element={el} actions={[
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
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination pager={pager} />
        </>
    );
}
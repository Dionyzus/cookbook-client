import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { deleteRecipe } from "../../api/recipeApi";
import { IPager } from "../../interface/IPager";
import { IRecipe } from "../../interface/IRecipe";
import Pagination from "../pagination/pagination";
import RecipeTableRow from "../recipe/recipeTableRow";

import styles from "../../styles/table.module.css";

interface IProps {
    initialIndex: number;
    pager: IPager;
    data: IRecipe[];
    collectionSize: number;
    elementsPerPage: number;
}

export default function RecipeTable(props: IProps) {
    const history = useHistory();
    const { data, pager, initialIndex } = props;
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
            dataCopy.splice((index - initialIndex), 1);
            setUpdatedData(dataCopy);
        } catch (error) {
            console.log("An error has occurred: " + error);
        }
    }

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.tableRowHeader}>
                    <tr>
                        <th className={styles.tableHeader}>#</th>
                        <th className={styles.tableHeader}>Name</th>
                        <th className={styles.tableHeader}>Description</th>
                        <th className={styles.tableHeader}></th>
                        <th className={styles.tableHeader}>Actions</th>
                        <th className={styles.tableHeader}></th>
                    </tr>
                </thead>
                <tbody>
                    {updatedData != null && updatedData.map((el: IRecipe, index: number) =>
                        <tr className={styles.tableRowItems} key={el._id}>
                            <RecipeTableRow index={initialIndex + index} element={el} actions={[
                                {
                                    action: () => handleViewRecipeDetails(el, initialIndex + index),
                                    actionName: 'Details'
                                },
                                {
                                    action: () => handleEditRecipe(el, initialIndex + index),
                                    actionName: 'Edit'
                                },
                                {
                                    action: () => handleDeleteRecipe(el, initialIndex + index),
                                    actionName: 'Delete'
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
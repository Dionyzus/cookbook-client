import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipeApi";
import { IPaging } from "../interface/IPaging";

export function useRecipeCollection(searchParams: URLSearchParams, debouncedText: string, searchText: string) {
    const [recipeCollection, setRecipeCollection] = useState<IPaging>({
        pager: {
            collectionSize: 0,
            currentPage: 0,
            pagesCount: 0,
            pages: []
        },
        itemCollection: []
    });
    useEffect(() => {
        async function getRecipeCollection() {

            console.log("Am i here at least");
            if (debouncedText !== searchText) {
                return;
            }
            const result = await getRecipes(searchParams);
            console.log("Do we have a result: " + JSON.stringify(result));
            if (result && result.data) {
                setRecipeCollection({
                    pager: result.data.pager,
                    itemCollection: result.data.collection
                });
            }

            return recipeCollection;
        }
        getRecipeCollection();
    }, [debouncedText, recipeCollection, searchParams, searchText]);

    return recipeCollection;
}
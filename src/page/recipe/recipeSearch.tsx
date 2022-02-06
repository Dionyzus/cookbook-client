import React, { useState, useEffect } from "react";
import { getRecipes } from "../../api/recipeApi";
import { useDebounce } from "../../hook/useDebounce";
import { IPaging } from "../../interface/IPaging";

interface IProps {
    filteredDataHandler: (filteredCollection: IPaging) => void;
}
export default function RecipeSearch(props: IProps) {
    const [searchText, setSearchText] = useState("");
    const debouncedText = useDebounce(searchText, 250);

    const { filteredDataHandler } = props;

    //TODO: Extract to custom hook
    useEffect(() => {
        async function getRecipeCollection() {

            if (debouncedText !== searchText) {
                return;
            }
            const searchQuery = {
                "name": debouncedText,
                "text": debouncedText
            };
            const searchParams = new URLSearchParams(searchQuery);

            const result = await getRecipes(searchParams);
            if (result && result.data) {
                filteredDataHandler({
                    pager: result.data.pager,
                    itemCollection: result.data.recipeCollection
                });
            }
        }
        getRecipeCollection();
    }, [searchText, filteredDataHandler, debouncedText]);

    function handleChange(event: React.FormEvent<HTMLInputElement>) {
        setSearchText(event.currentTarget.value);
    }

    return (
        <>
            <div>
                <h2>Search</h2>
            </div>
            <div>
                <input
                    type="search"
                    placeholder="Search Recipe"
                    onChange={handleChange}
                />
            </div>
        </>
    );
}
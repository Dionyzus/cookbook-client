import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { getRecipes } from "../../api/recipeApi";
import { useDebounce } from "../../hook/useDebounce";
import { IPaging } from "../../interface/IPaging";

import styles from "../../styles/search.module.css";

interface IProps {
    filteredDataHandler: (filteredCollection: IPaging) => void;
}

export default function RecipeSearch(props: IProps) {
    const [searchText, setSearchText] = useState("");
    const debouncedText = useDebounce(searchText, 250);

    const { filteredDataHandler } = props;

    useEffect(() => {
        async function getRecipeCollection() {
            if (debouncedText !== searchText) {
                return;
            }
            await fetchData(debouncedText, filteredDataHandler);
        }
        getRecipeCollection();
    }, [searchText, filteredDataHandler, debouncedText]);

    function handleChange(event: React.FormEvent<HTMLInputElement>) {
        setSearchText(event.currentTarget.value);
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.search}>
                <input
                    className={styles.searchTerm}
                    type="search"
                    placeholder="Search"
                    onChange={handleChange}
                />
                <button type="submit" className={styles.searchButton}>
                    <FontAwesomeIcon size="sm" icon={faSearch} />
                </button>
            </div>
        </div>
    );
}

async function fetchData(debouncedText: any, filteredDataHandler: (filteredCollection: IPaging) => void) {
    const result = await getRecipes(new URLSearchParams({
        "text": debouncedText,
    }));
    if (result && result.data) {
        filteredDataHandler({
            pager: result.data.pager,
            itemCollection: result.data.collection
        });
    }
}

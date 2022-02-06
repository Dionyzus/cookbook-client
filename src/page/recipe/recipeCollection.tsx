import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { getRecipes } from '../../api/recipeApi';
import Table from '../../component/table';
import { IPaging } from '../../interface/IPaging';
import RecipeSearch from './recipeSearch';

const LIMIT = 5;
const OFFSET = 0;

export default function RecipeCollection() {

    const location = useLocation();
    const search = location.search;
    const limitParam = new URLSearchParams(search).get("limit");
    const offsetParam = new URLSearchParams(search).get("offset");

    const offset = offsetParam != null ? parseInt(offsetParam) : OFFSET;
    const limit = limitParam != null ? parseInt(limitParam) : LIMIT;
    const history = useHistory();

    const [filteredPaging, setFilteredPaging] = useState<IPaging>({
        pager: {
            collectionSize: 0,
            currentPage: 0,
            pagesCount: 0,
            pages: []
        },
        itemCollection: []
    });

    //TODO: Extract to custom hook
    useEffect(() => {
        async function getRecipeCollection() {
            const searchQuery = {
                "limit": limit.toString(),
                "offset": offset.toString()
            };
            const searchParams = new URLSearchParams(searchQuery);

            const result = await getRecipes(searchParams);
            if (result && result.data) {
                setFilteredPaging({
                    pager: result.data.pager,
                    itemCollection: result.data.collection
                });
            }
        }
        getRecipeCollection();
    }, [offsetParam, limitParam, limit, offset]);

    useEffect(() => {
        setFilteredPaging(filteredPaging);
    }, [filteredPaging])

    function handleAddNew() {
        history.push(`/recipes/new`);
    }

    const { pager: filteredPager, itemCollection: filteredItemCollection } = filteredPaging;

    return (
        <>
            <RecipeSearch filteredDataHandler={setFilteredPaging}></RecipeSearch>
            {
                <Table pager={filteredPager}
                    initialIndex={offset * limit}
                    data={filteredItemCollection.length > 0 ? filteredItemCollection : []}
                    collectionSize={filteredPager.collectionSize || 0}
                    elementsPerPage={limit}
                />
            }
            <div>
                <button onClick={handleAddNew}
                    color="primary">new
                </button>
            </div>
        </>
    );
}
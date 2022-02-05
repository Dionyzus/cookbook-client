import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { getRecipes } from '../../api/recipeApi';
import Table from '../../component/table';
import { IPaging } from '../../interface/IPaging';

const LIMIT = 5;
const OFFSET = 0;

export default function RecipeCollection() {

    const location = useLocation();
    const search = location.search;
    const limitParam = new URLSearchParams(search).get("limit");
    const offsetParam = new URLSearchParams(search).get("offset");

    const offset = offsetParam != null ? parseInt(offsetParam) : OFFSET;
    const limit = limitParam != null ? parseInt(limitParam) : LIMIT;

    const [collectionSize, setCollectionSize] = useState();
    const history = useHistory();

    const [paging, setPaging] = useState<IPaging>({
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
            const result = await getRecipes(limit, offset);
            if (result && result.data) {
                setCollectionSize(result.data.pager.collectionSize)
                setPaging({
                    pager: result.data.pager,
                    itemCollection: result.data.recipeCollection
                });
            }
        }
        getRecipeCollection();
    }, [setCollectionSize, setPaging, offsetParam, limitParam, limit, offset]);

    function handleAddNew() {
        history.push(`/recipes/new`);
    }

    const { pager, itemCollection } = paging;

    return (
        <>
            {
                (itemCollection != null && <Table pager={pager} data={itemCollection} collectionSize={collectionSize || 0} elementsPerPage={limit} />)
            }
            <div>
                <button onClick={handleAddNew}
                    color="primary">new
                </button>
            </div>
        </>
    );
}
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getRecipes } from "../api/recipeApi";
import { IPager } from "../interface/IPager";

const LIMIT = 5;

interface IProps {
    pager: IPager
}

export default function TableFooter(props: IProps) {

    const location = useLocation();
    const search = location.search;
    const limitParam = new URLSearchParams(search).get("limit");

    const limit = limitParam != null ? parseInt(limitParam) : LIMIT;
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        const offsetParam = new URLSearchParams(search).get("offset");
        const page = offsetParam != null ? parseInt(offsetParam) : 0;

        async function getRecipeCollection() {
            const result = await getRecipes(limit, page);
            if (result && result.data) {
                setCurrentPage(page);
            }
        }
        if (page !== currentPage) {
            getRecipeCollection();
        }
    }, [limit, currentPage, search]);

    const { pager } = props;

    return (
        <>
            <div>
                {pager.pages && pager.collectionSize &&
                    <>
                        <button>
                            <Link to={{ search: `?offset=0` }}>{pager.currentPage !== 1 && "First"}</Link>
                        </button>
                        <div>
                            <Link to={{ search: `?offset=${currentPage - 1}` }}>{pager.currentPage !== 1 && "Previous"}</Link>
                        </div>
                        {pager.pages.map(page =>
                            <div key={page}>
                                <Link to={{ search: `?offset=${page}` }}>{page + 1}</Link>
                            </div>
                        )}
                        <div>
                            <Link to={{ search: `?offset=${currentPage + 1}` }}>{pager.currentPage !== pager.pagesCount && "Next"}</Link>
                        </div>
                        <div>
                            <Link to={{ search: `?offset=${pager.pagesCount - 1}` }}>{pager.currentPage !== pager.pagesCount && "Last"}</Link>
                        </div>
                    </>
                }
            </div>
        </>
    );
}
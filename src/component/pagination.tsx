import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getRecipes } from "../api/recipeApi";
import { IPager } from "../interface/IPager";

const LIMIT = 5;
const OFFSET = 0;

interface IProps {
    pager: IPager
}

export default function Pagination(props: IProps) {

    const history = useHistory();
    const location = useLocation();
    const search = location.search;
    const limitParam = new URLSearchParams(search).get("limit");

    const offsetParam = new URLSearchParams(search).get("offset");
    const offset = offsetParam != null ? parseInt(offsetParam) : OFFSET;

    const limit = limitParam != null ? parseInt(limitParam) : LIMIT;
    const [currentPage, setCurrentPage] = useState<number>(-1);

    useEffect(() => {
        if (currentPage === -1 && offset !== null) {
            setCurrentPage(offset);
        }
    }, [currentPage, offset]);

    async function handlePageChange(page: number) {
        if (page !== currentPage) {
            const result = await getRecipes(limit, page);
            if (result && result.data) {
                setCurrentPage(page);
                history.push(`?offset=${page}`);
            }
        }
    }

    const { pager } = props;

    return (
        <>
            <div>
                {pager.pages && pager.collectionSize &&
                    <>
                        {pager.currentPage !== 1 &&
                            <button onClick={() => handlePageChange(0)}>
                                First
                            </button>
                        }
                        {pager.currentPage !== 1 &&
                            <button onClick={() => handlePageChange(currentPage - 1)}>
                                Previous
                            </button>
                        }
                        {pager.pages.map(page =>
                        (page === currentPage ?
                            <button style={{ fontWeight: "bolder" }} key={page} onClick={() => handlePageChange(page)}>
                                {page + 1}
                            </button> :
                            <button key={page} onClick={() => handlePageChange(page)}>
                                {page + 1}
                            </button>)
                        )}
                        {pager.currentPage !== pager.pagesCount &&
                            <button onClick={() => handlePageChange(currentPage + 1)}>
                                Next
                            </button>
                        }
                        {pager.currentPage !== pager.pagesCount &&
                            <button onClick={() => handlePageChange(pager.pagesCount - 1)}>
                                Last
                            </button>
                        }
                    </>
                }
            </div>
        </>
    );
}
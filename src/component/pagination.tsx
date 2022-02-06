import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getRecipes } from "../api/recipeApi";
import { IPager } from "../interface/IPager";
import { generateArray } from "../util/arrayUtil";

const LIMIT = 5;
const OFFSET = 0;
const LIMIT_MULTI = 5;

interface IProps {
    pager: IPager
}

export default function Pagination(props: IProps) {

    const history = useHistory();
    const location = useLocation();
    const search = location.search;
    const limitParam = new URLSearchParams(search).get("limit");
    const limit = limitParam != null ? parseInt(limitParam) : LIMIT;

    const offsetParam = new URLSearchParams(search).get("offset");
    const offset = offsetParam != null ? parseInt(offsetParam) : OFFSET;

    const [currentLimit, setCurrentLimit] = useState<number>(-1);
    const [currentPage, setCurrentPage] = useState<number>(-1);

    useEffect(() => {
        if (currentPage === -1 && offset !== null) {
            setCurrentPage(offset);
        }
        if (currentLimit === -1 && limit !== null) {
            setCurrentLimit(limit);
        }
    }, [currentLimit, currentPage, limit, offset]);

    async function handlePageChange(page: number, limit: number) {
        if (page !== currentPage || limit !== currentLimit) {
            const searchQuery = {
                "limit": limit.toString(),
                "offset": page.toString()
            };
            const searchParams = new URLSearchParams(searchQuery);

            const result = await getRecipes(searchParams);
            if (result && result.data) {
                setCurrentPage(page);
                setCurrentLimit(limit);
                history.push(`?offset=${page}&limit=${limit}`);
            }
        }
    }

    const { pager } = props;
    const limitDisplay = generateArray(pager.collectionSize, LIMIT_MULTI);

    return (
        <>
            <div>
                {pager.pages && pager.collectionSize ?
                    <>
                        {pager.currentPage !== 1 &&
                            <button onClick={() => handlePageChange(0, currentLimit)}>
                                First
                            </button>
                        }
                        {pager.currentPage !== 1 &&
                            <button onClick={() => handlePageChange(currentPage - 1, currentLimit)}>
                                Previous
                            </button>
                        }
                        {pager.pages.map(page =>
                        (page === currentPage ?
                            <button style={{ fontWeight: "bolder" }} key={page} onClick={() => handlePageChange(page, currentLimit)}>
                                {page + 1}
                            </button> :
                            <button key={page} onClick={() => handlePageChange(page, currentLimit)}>
                                {page + 1}
                            </button>)
                        )}
                        {pager.currentPage !== pager.pagesCount &&
                            <button onClick={() => handlePageChange(currentPage + 1, currentLimit)}>
                                Next
                            </button>
                        }
                        {pager.currentPage !== pager.pagesCount &&
                            <button onClick={() => handlePageChange(pager.pagesCount - 1, currentLimit)}>
                                Last
                            </button>
                        }
                        <select>
                            {limitDisplay.map(index =>
                            (<option key={index} value="" onClick={() => handlePageChange(currentPage, (index + 1) * LIMIT_MULTI)}>{(index + 1) * LIMIT_MULTI}</option>
                            ))
                            }
                        </select>
                    </>
                    : null}
            </div>
        </>
    );
}
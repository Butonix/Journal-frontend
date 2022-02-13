import {useState} from "react";
import {getTotalPages} from "../utils/pagination/getTotalPages";

export const usePagination = (initialData,countItems) => {
    const [data, setData] = useState(initialData)
    const [take, setTake] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount,setPageCount] = useState(getTotalPages(countItems,take))

    const changePageHandler = (_, value) => {
        setCurrentPage(value)
    }

    return {
        data, setData,
        take, setTake,
        currentPage, setCurrentPage,
        pageCount,setPageCount,
        changePageHandler
    }
}
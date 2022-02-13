import {MainLayout} from "../../layouts/MainLayout";
import {UsersList} from "../../components/UsersList";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Api} from "../../utils/api";
import {Pagination} from "@mui/material";
import {getTotalPages} from "../../utils/pagination/getTotalPages";

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [limit,setLimit] = useState(1)
    const [countItems,setCountItems] = useState(0)

    const changePageHandler = (_,value) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        (async () => {
            const [data,count] = await Api().users.getAllUsers(limit,currentPage)
            setCountItems(count)
            setUsers(data)
        })()
    }, [currentPage])
return (
    <MainLayout>
        <UsersList  usersList={users}/>
        <Pagination
            defaultValue={currentPage}
            onChange={changePageHandler}
            count={getTotalPages(countItems,limit)}
        />
    </MainLayout>
)
}
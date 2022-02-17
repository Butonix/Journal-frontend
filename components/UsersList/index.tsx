import {Avatar, List, ListItem, makeStyles, Paper} from "@material-ui/core";
import React, {useEffect} from "react";
import styles from './UserList.module.scss'
import {FollowButton} from "../FollowButton";
import Link from "next/link";
import {Pagination} from "@mui/material";
import {usePagination} from "../../hooks/usePagination";
import {getTotalPages} from "../../utils/pagination/getTotalPages";
import {useRouter} from "next/router";

export const UsersList = ({usersList, requestHandler, keyword='', count, ...props}) => {

    const {
        take,
        currentPage,
        setData: setArrayArticles,
        setCurrentPage,
        data: arrayUsers,
        pageCount,
        setPageCount
    } = usePagination(usersList, count)

    const changePageHandler = (_, value) => {
        setCurrentPage(value)
    }

    useEffect(() => {
        (async () => {
            const usersList = await requestHandler(take, currentPage,keyword)
            setArrayArticles(usersList[0])
            setPageCount(getTotalPages(usersList[1], take))
        })()
    }, [currentPage, requestHandler, pageCount])

    return (
        <div>
            <Paper style={{backgroundColor: '#fff'}}>
                {
                    arrayUsers && arrayUsers.map(el =>
                        <div className='users-listItem' key={el.id}>
                            <Link href={`/users/${el.id}`}>
                                <div className={styles.listItemUser}>
                                    <Avatar src={el.avatarUrl}>{el.fullName[0]}</Avatar>
                                    <span>{el.fullName}</span>
                                </div>
                            </Link>
                            <FollowButton id={el.id}/>
                        </div>)
                }
            </Paper>
            <Pagination
                defaultValue={currentPage}
                onChange={changePageHandler}
                count={pageCount}
            />
        </div>
    )
}
import styles from './SearchBlock.module.scss'
import {SearchOutlined as SearchIcon, Send} from "@material-ui/icons";
import {Avatar, IconButton} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Api} from "../../utils/api";
import {List, ListItem, Paper} from "@mui/material";
import Link from "next/link";
import {FollowButton} from "../FollowButton";

export const SearchBlock = () => {
    const [searchStr, setSearchStr] = useState('')
    const [array, setArray] = useState([])

    const searchUsers = async () => {
        const [data,count] = await Api().users.getAllUsers(10,1,searchStr)
        setArray(data)
    }

    return (
        <div>
            <div className={styles.searchWrapper}>
                <div className={styles.searchBlock}>
                    <SearchIcon/>
                    <input value={searchStr} onChange={e => setSearchStr(e.target.value)} placeholder="Поиск"/>
                </div>
                <IconButton onClick={searchUsers}>
                    <Send/>
                </IconButton>
            </div>
            <Paper style={!!array.length ? {display: "flex"} : {}} className={styles.listWrapper}>
                <List>
                    {array && array.map(el =>
                        <ListItem className='users-listItem' key={el.id}>
                            <Link href={`/users/${el.id}`}>
                                <div className={styles.listItemUser}>
                                    <Avatar src={el.avatarUrl}>{el.fullName[0]}</Avatar>
                                    <span>{el.fullName}</span>
                                </div>
                            </Link>
                            <FollowButton id={el.id}/>
                        </ListItem>)
                    }
                    <ListItem
                        style={{display:"flex",justifyContent:"center",cursor:"pointer"}}>
                        <div onClick={()=>setArray([])}>Закрыть</div>
                        <Link href={{pathname:'/users/',query:{keyword:searchStr}}}>Все</Link>
                    </ListItem>
                </List>
            </Paper>
        </div>
    )
}
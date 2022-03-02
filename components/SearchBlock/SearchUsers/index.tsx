import styles from "../SearchBlock.module.scss";
import {SearchOutlined as SearchIcon, Send} from "@material-ui/icons";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {Avatar, IconButton} from "@material-ui/core";
import {List, ListItem, Paper} from "@mui/material";
import Link from "next/link";
import {FollowButton} from "../../FollowButton";
import React from "react";

export const SearchUsers = ({usersData, searchHandler, searchStr, setSearchStr, setArray, toggleOption}) => {
    return (
        <div>
            <div className={styles.searchWrapper}>
                <div className={styles.searchBlock}>
                    <SearchIcon />
                    <input value={searchStr} onChange={e => setSearchStr(e.target.value)} placeholder="Поиск"/>
                </div>
                <IconButton style={{color:'#fff'}} onClick={searchHandler}>
                    <Send/>
                </IconButton>
                <IconButton style={{color:'#fff'}} onClick={toggleOption}>
                    <SearchOffIcon/>
                </IconButton>
            </div>
            <Paper style={!!usersData.length ? {display: "flex"} : {}} className={styles.listWrapper}>
                <List>
                    {usersData && usersData.map(el =>
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
                        style={{display: "flex", justifyContent: "center", cursor: "pointer"}}>
                        <div onClick={() => setArray([])}>Закрыть</div>
                        <Link href={{pathname: '/users/', query: {keyword: searchStr}}}>Все</Link>
                    </ListItem>
                </List>
            </Paper>
        </div>
    )
}
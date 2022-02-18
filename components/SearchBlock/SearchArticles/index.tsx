import styles from "../SearchBlock.module.scss";
import {SearchOutlined as SearchIcon, Send} from "@material-ui/icons";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {Avatar, IconButton} from "@material-ui/core";
import {List, ListItem, Paper} from "@mui/material";
import Link from "next/link";
import {FollowButton} from "../../FollowButton";
import React from "react";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export const SearchArticles = ({articlesData,searchHandler, searchStr, setSearchStr, setArray,toggleOption}) => {
    return (
        <div>
            <div className={styles.searchWrapper}>
                <div className={styles.searchBlock}>
                    <SearchIcon/>
                    <input value={searchStr} onChange={e => setSearchStr(e.target.value)} placeholder="Поиск"/>
                </div>
                <IconButton onClick={searchHandler}>
                    <Send/>
                </IconButton>
                <IconButton onClick={toggleOption}>
                    <SearchOffIcon/>
                </IconButton>
            </div>
            <Paper style={!!articlesData.length ? {display: "flex"} : {}} className={styles.listWrapper}>
                <List>
                    {articlesData && articlesData.map(el =>
                        <ListItem className='users-listItem' key={el.id}>
                            <div>
                                <div className={styles.listItemUser}>
                                    <Avatar src={el.user.avatarUrl}>{el.user.fullName[0]}</Avatar>
                                    <span>{el.title}</span>
                                </div>
                            </div>
                            <IconButton>
                                <Link href={`/news/${el.id}`}>
                                    <DoubleArrowIcon />
                                </Link>
                            </IconButton>

                        </ListItem>)
                    }
                    <ListItem
                        style={{display:"flex",justifyContent:"space-between",cursor:"pointer"}}>
                        <div onClick={()=>setArray([])}>Закрыть</div>
                        <Link href={{pathname:'/news/',query:{keyword:searchStr}}}>Все</Link>
                    </ListItem>
                </List>
            </Paper>
        </div>
    )
}
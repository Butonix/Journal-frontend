import {Avatar, List, ListItem, makeStyles} from "@material-ui/core";
import React from "react";
import styles from './UserList.module.scss'
import {FollowButton} from "../FollowButton";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:'20px'
    }
}))

export const UsersList = ({usersList, ...props}) => {
    const classes = useStyles(props);
    return (
        <List style={{backgroundColor: '#fff'}}>
            {
                usersList && usersList.map(el =>
                    <ListItem className={classes.listItem} key={el.id}>
                        <Link href={`/users/${el.id}`}>
                            <div className={styles.listItemUser}>
                                <Avatar src={el.avatarUrl}>{el.fullName[0]}</Avatar>
                                <span>{el.fullName}</span>
                            </div>
                        </Link>
                        <FollowButton id={el.id}/>
                    </ListItem>)
            }
        </List>
    )
}
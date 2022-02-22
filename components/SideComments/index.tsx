import React, {useEffect, useState} from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';
import {ArticleResponse, LoginUserResponse} from "../../utils/api/types";
import Avatar from '@material-ui/core/Avatar/Avatar';
import {Api} from "../../utils/api";
import {Paper} from "@mui/material";


interface CommentItemProps {
    user: LoginUserResponse
    text: string;
    title: string
}

export const CommentItem: React.FC<CommentItemProps> = ({user, text,title}) => {
    return (
        <Paper className={styles.commentItem} elevation={8} >
            <div className={styles.userInfo}>
                <Avatar src={user.avatarUrl} >
                    {user.fullName[0]}
                </Avatar>
                <a href="#">
                    <b>{user.fullName}</b>
                </a>
            </div>
            <p className={styles.text}>{text}</p>
            <a href="#">
                <span className={styles.postTitle}>{title}</span>
            </a>
        </Paper>
    );
};

export const SideComments = () => {
    const [items, setItems] = useState([])
    const [isVisible, setIsVisible] = useState(true)
    useEffect(() => {
        (async ()=>{
            const comments = await Api().comment.getComments()
            setItems(comments)
        })()
    }, [])

    return (
        <div className={isVisible ? styles.root : styles.rootRotate}>
            {isVisible && items.map((el) => (
                <CommentItem key={el.id} text={el.text} user={el.user} title={el.article.title} />
            ))}
        </div>
    );
};

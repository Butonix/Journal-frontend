import { Paper, Avatar } from '@mui/material';
import React from 'react'
import { UserResponse } from '../../utils/api/types';
import styles from './CommentItem.module.scss'

interface CommentItemProps {
    user: UserResponse
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
                <a href={`/users/${user.id}`}>
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
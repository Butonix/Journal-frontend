import React from 'react';
import {Avatar, IconButton, Menu, MenuItem, Typography} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import {CommentResponse, LoginUserResponse} from "../../utils/api/types";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {Api} from "../../utils/api";

export interface CommentProps {
    text: string
    id: number
    createdAt: string
    user: LoginUserResponse
    onRemoveHandler: (id: number) => void
}

export const Comment: React.FC<CommentProps> = ({user, text, createdAt, id, onRemoveHandler}) => {
    const currentUserId = useAppSelector(selectUserData)?.id
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const onRemoveComment = async (id) => {
        const result = await Api().comment.removeComment(id)
        onRemoveHandler(id)
    }
    return (
        <div className={styles.comment}>
            <div className={styles.userInfo}>
                <Avatar
                    src={user.avatarUrl}
                    alt="Avatar"
                >{user.fullName[0]}</Avatar>
                <b>{user.fullName}</b>
                <span>{createdAt}</span>
            </div>
            <Typography className={styles.text}>
                {text}
            </Typography>
            {currentUserId === user.id && <>
                <IconButton onClick={handleClick}>
                    <MoreIcon/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    elevation={2}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    keepMounted>
                    <MenuItem onClick={() => onRemoveComment(id)}>Удалить</MenuItem>
                </Menu>
            </>}
        </div>
    );
};

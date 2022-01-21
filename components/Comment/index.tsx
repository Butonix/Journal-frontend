import React from 'react';
import {IconButton, Menu, MenuItem, Typography} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';

export interface CommentProps {
    text: string
    id: number
    createdAt: string
    user: {
        fullName: string
        avatar: string
    }
}

export const Comment: React.FC<CommentProps> = ({user, text, createdAt}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.comment}>
            <div className={styles.userInfo}>
                <img
                    src={user.avatar}
                    alt="Avatar"
                />
                <b>{user.fullName}</b>
                <span>{createdAt}</span>
            </div>
            <Typography className={styles.text}>
                {text}
            </Typography>
            <span className={styles.replyBtn}>Ответить</span>
            <IconButton onClick={handleClick}>
                <MoreIcon/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                elevation={2}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted>
                <MenuItem onClick={handleClose}>Удалить</MenuItem>
                <MenuItem onClick={handleClose}>Редактировать</MenuItem>
            </Menu>
        </div>
    );
};

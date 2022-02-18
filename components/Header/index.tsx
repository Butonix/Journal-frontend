import React, {useState} from 'react';
import Link from 'next/link';
import {Avatar, Button, IconButton, Paper} from '@material-ui/core';
import {
    AccountCircleOutlined as UserIcon,
    ExpandMoreOutlined as ArrowBottom,
    Menu as MenuIcon,
    SmsOutlined as MessageIcon
} from '@material-ui/icons';


import styles from './Header.module.scss';
import {AuthDialog} from "../AuthDialog/AuthDialog";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {setLeftMenu, setRightMenu} from "../../redux/slices/layout";
import {SearchBlock} from "../SearchBlock";

export const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(selectUserData)
    const [authOpen, setAuthOpen] = useState(false)


    const handleClickOpen = () => {
        setAuthOpen(true)
    }
    const handleClickClose = () => {
        setAuthOpen(false)
    }
    const toggleLeftMenu = () => {
        dispatch(setLeftMenu())
    }
    const rightCommentVisible = () => {
        dispatch(setRightMenu())
    }
    return (
        <div>
            <Paper classes={{root: styles.root}} elevation={0}>
                <div className={styles.leftSide}>
                    <IconButton onClick={toggleLeftMenu}>
                        <MenuIcon/>
                    </IconButton>
                    <Link href="/">
                        <a>
                            <img height={35} className="mr-20" src="/static/img/logo.svg" alt="Logo"/>
                        </a>
                    </Link>
                    <Link href='/write'>
                        <Button variant="contained" className={styles.penButton}>
                            Новая запись
                        </Button>
                    </Link>
                    <SearchBlock/>

                </div>

                <div className="d-flex align-center">
                    <IconButton onClick={rightCommentVisible}>
                        <MessageIcon/>
                    </IconButton>
                    {userData
                        ? <Link href={`/users/${userData.id}`}>
                            <a className="d-flex align-center">
                                <Avatar
                                    className={styles.avatar}
                                    alt="Remy Sharp"
                                    src={userData.avatarUrl || ''}
                                >
                                    {userData.fullName[0]}
                                </Avatar>
                                <ArrowBottom/>
                            </a>
                        </Link>
                        : <div className={styles.loginButton} onClick={handleClickOpen}>
                            <UserIcon/>
                            Войти
                        </div>

                    }
                </div>
            </Paper>
            {authOpen && <AuthDialog open={authOpen} close={handleClickClose}/>}
        </div>

    );
};

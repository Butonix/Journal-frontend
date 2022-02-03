import React, {useState} from 'react';
import Link from 'next/link';
import {Avatar, Button, IconButton, Paper} from '@material-ui/core';
import {
    AccountCircleOutlined as UserIcon,
    ExpandMoreOutlined as ArrowBottom,
    Menu as MenuIcon,
    NotificationsNoneOutlined as NotificationIcon,
    SearchOutlined as SearchIcon,
    SmsOutlined as MessageIcon
} from '@material-ui/icons';

import styles from './Header.module.scss';
import {AuthDialog} from "../AuthDialog/AuthDialog";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";

export const Header: React.FC = () => {

    const userData = useAppSelector(selectUserData)
    const [authOpen, setAuthOpen] = useState(false)

    const handleClickOpen = () => {
        setAuthOpen(true)
    }
    const handleClickClose = () => {
        setAuthOpen(false)
    }
    return (
        <div>
            <Paper classes={{root: styles.root}} elevation={0}>
                <div className="d-flex align-center">
                    <IconButton>
                        <MenuIcon/>
                    </IconButton>
                    <Link href="/">
                        <a>
                            <img height={35} className="mr-20" src="/static/img/logo.svg" alt="Logo"/>
                        </a>
                    </Link>

                    <div className={styles.searchBlock}>
                        <SearchIcon/>
                        <input placeholder="Поиск"/>
                    </div>

                    <Link href='/write'>
                        <Button variant="contained" className={styles.penButton}>
                            Новая запись
                        </Button>
                    </Link>

                </div>
                <div className="d-flex align-center">
                    <IconButton onClick={handleClickOpen}>
                        <MessageIcon/>
                    </IconButton>
                    <IconButton>
                        <NotificationIcon/>
                    </IconButton>
                    {userData
                        ? <Link href={`/users/${userData.id}`}>
                            <a className="d-flex align-center">
                                <Avatar
                                    className={styles.avatar}
                                    alt="Remy Sharp"
                                    src={''}
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

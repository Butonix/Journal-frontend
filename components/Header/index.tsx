import React, {useState} from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import {Avatar, Button, IconButton, Paper} from '@material-ui/core';
import {
    AccountCircleOutlined as UserIcon,
    ExpandMoreOutlined as ArrowBottom,
    Menu as MenuIcon,
} from '@material-ui/icons';
import {AuthDialog} from "../AuthDialog/AuthDialog";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {setLeftMenu} from "../../redux/slices/layout";
import {SearchBlock} from "../SearchBlock";
import {theme} from "../../theme";

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

    return (
        <div className={styles.headerWrapper}>
            <Paper classes={{root: styles.root}} square elevation={8}>
                <div className={styles.leftSide}>
                    <IconButton style={{color:'#fff'}} onClick={toggleLeftMenu}>
                        <MenuIcon/>
                    </IconButton>
                    <Link href="/">
                        <a className={'d-flex align-center pl-20 pr-20'}>
                            <img height={40} src="/static/img/newspaper.png" alt="Logo"/>
                        </a>
                    </Link>
                    <Link href='/write'>
                        <Button className={styles.penButton}>
                            Новая запись
                        </Button>
                    </Link>
                    <SearchBlock/>

                </div>
                <div className={styles.rightSide}>
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
                                <ArrowBottom style={{color:'#fff'}}/>
                            </a>
                        </Link>
                        : <div className={styles.loginButton} onClick={handleClickOpen}>
                            <UserIcon color='secondary'/>
                            Войти
                        </div>
                    }
                </div>
            </Paper>
            {authOpen && <AuthDialog open={authOpen} close={handleClickClose}/>}
        </div>
    );
};

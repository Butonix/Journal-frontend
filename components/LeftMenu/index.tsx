import React from 'react';
import Link from 'next/link';
import {Button} from '@material-ui/core';
import {
    FormatListBulletedOutlined as ListIcon,
    PeopleAltOutlined as UsersIcon,
    WhatshotOutlined as FireIcon,
    StarBorder,
    RecentActorsOutlined
} from '@material-ui/icons';

import styles from './LeftMenu.module.scss';
import {useRouter} from "next/router";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import Paper from '@mui/material/Paper';


export const LeftMenu: React.FC = () => {
    const router = useRouter()
    const currentUser = useAppSelector(selectUserData)
    const menu = [
        {text: 'Свежее', icon: <FireIcon/>, path: '/'},
        {text: 'Популярное', icon: <StarBorder/>, path: '/popular'},
        {text: 'Моя лента', icon: <RecentActorsOutlined/>, path: '/feed'},
        {text: 'Все пользователи', icon: <UsersIcon/>, path: '/users'},
        {text: 'Подписки', icon: <ListIcon/>, path: `/users/${currentUser?.id}/following`},
    ];
    return (
        <div className={styles.menu}>
            <ul>
                {menu.map((obj) => (
                    <li key={obj.path}>
                       <Paper>
                           <Link href={obj.path}>
                               <a>
                                   <Button variant={router.pathname === obj.path ? 'outlined' : 'text'}>
                                       {obj.icon}
                                       {obj.text}
                                   </Button>
                               </a>
                           </Link>
                       </Paper>
                    </li>
                ))}
            </ul>
        </div>
    );
};

import Link from 'next/link';
import {Avatar, Button, Paper, Tab, Tabs, Typography} from '@material-ui/core';
import {SettingsOutlined as SettingsIcon, TextsmsOutlined as MessageIcon, AddBox} from '@material-ui/icons';
import {MainLayout} from '../../../layouts/MainLayout';
import {Api} from "../../../utils/api";
import {GetServerSideProps, NextPage} from "next";
import {useAppSelector} from "../../../redux/hooks";
import {selectUserData} from "../../../redux/slices/user";
import {Post} from "../../../components/Post";
import {ArticleResponse} from "../../../utils/api/types";
import {useState} from "react";
import {FollowButton} from "../../../components/FollowButton";


interface ProfilePageProps {
    id: number
    articles: Array<ArticleResponse> | []
    avatarUrl: string
    email: string
    following: Array<number> | []
    followers: Array<number> | []
    fullName: string
    password?: string
}

export default function Profile({user}) {
    const currentUser = useAppSelector(selectUserData)

    return (
        <MainLayout contentFullWidth hideComments>
            <Paper className="pl-20 pr-20 pt-20 mb-30" elevation={0}>
                <div className="d-flex justify-between">
                    <div className='mb-25'>
                        <Avatar
                            src={user.avatarUrl}
                            style={{width: 150, height: 150, borderRadius: 6}}
                        >
                            {!!user.fullName && user?.fullName[0]}
                        </Avatar>
                        <Typography style={{fontWeight: 'bold'}} className="mt-20" variant="h4">
                            {!!user.fullName && user.fullName}
                        </Typography>
                    </div>
                    <div>
                        {currentUser && user.id === currentUser.id &&
                            <Link href="/users/settings">
                                <Button
                                    style={{height: 42, minWidth: 45, width: 45, marginRight: 10}}
                                    variant="contained">
                                    <SettingsIcon/>
                                </Button>
                            </Link>}
                        {!currentUser?.id === user.id && <FollowButton id={user.id}/>}
                    </div>
                </div>
                <div>
                    <div>
                        <Link href={`/users/${user.id}/following`}>
                            <a>
                                Подписки <span>{user.following.length}</span>
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/users/${user.id}/followers`}>
                            <a>
                                Подписчики <span>{user.followers.length}</span>
                            </a>
                        </Link>
                    </div>

                </div>
                <Typography>На проекте с 15 сен 2016</Typography>

                <Tabs className="mt-20" value={0} indicatorColor="primary" textColor="primary">
                    <Tab label="Статьи"/>
                    <Tab label="Комментарии"/>
                    <Tab label="Закладки"/>
                </Tabs>
            </Paper>
            <div className="d-flex align-start">
                <div className="flex">
                    {
                        user.articles.map(el => <Post key={el.id} title={el.title} user={user}
                                                      description={el.description} id={el.id} {...el}/>)
                    }
                </div>
            </div>
        </MainLayout>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = ctx.params.id
        const user = await Api().users.getUserData(+id)
        return {
            props: {user}
        }
    } catch (e) {
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
}

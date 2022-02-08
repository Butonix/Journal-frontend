import Link from 'next/link';
import {Avatar, Button, Paper, Tab, Tabs, Typography} from '@material-ui/core';
import {SettingsOutlined as SettingsIcon, TextsmsOutlined as MessageIcon, AddBox} from '@material-ui/icons';
import {MainLayout} from '../../layouts/MainLayout';
import {Api} from "../../utils/api";
import {GetServerSideProps, NextPage} from "next";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {Post} from "../../components/Post";
import {ArticleResponse} from "../../utils/api/types";
import {useState} from "react";

interface ProfilePageProps {
    id: number
    articles: Array<ArticleResponse> | []
    avatarUrl: string
    email: string
    followers: Array<number> | []
    fullName: string
    password?: string
}

export default function Profile({user}) {
    const currentUser = useAppSelector(selectUserData)

    const [isFollow, setIsFollow] = useState(currentUser.followers.some(el => el === user.id))
    const followUser = async () => {
        const response = await Api().users.followUser({id: user.id})
        setIsFollow(prev => !prev)
    }
    const unfollowUser = async () => {
        const response = await Api().users.unfollowUser({id: user.id})
        setIsFollow(prev => !prev)
    }

    return (
        <MainLayout contentFullWidth hideComments>
            <Paper className="pl-20 pr-20 pt-20 mb-30" elevation={0}>
                <div className="d-flex justify-between">
                    <div>
                        <Avatar
                            src={user.avatarUrl}
                            style={{width: 120, height: 120, borderRadius: 6}}
                        >
                            {!!user.fullName && user?.fullName[0]}
                        </Avatar>
                        <Typography style={{fontWeight: 'bold'}} className="mt-10" variant="h4">
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
                        {
                            !isFollow
                                ? <Button onClick={followUser} style={{height: 42}} variant="contained" color="primary">
                                    <AddBox className="mr-10"/>
                                    Подписаться
                                </Button>
                                : <Button onClick={unfollowUser} style={{height: 42}} variant="contained" color="primary">
                                    <AddBox className="mr-10"/>
                                    Отменить подписку
                                </Button>
                        }
                    </div>
                </div>
                <div className="d-flex mb-10 mt-10">
                    <Typography style={{fontWeight: 'bold', color: '#35AB66'}} className="mr-15">
                        +208
                    </Typography>
                    <Typography>{} подписчика</Typography>
                </div>
                <Typography>На проекте с 15 сен 2016</Typography>

                <Tabs className="mt-20" value={0} indicatorColor="primary" textColor="primary">
                    <Tab label="Статьи"/>
                    <Tab label="Комментарии"/>
                    <Tab label="Закладки"/>
                </Tabs>
            </Paper>
            <div className="d-flex align-start">
                <div className="mr-20 flex">
                    {
                        user.articles.map(el => <Post key={el.id} title={el.title} user={user}
                                                      description={el.description} id={el.id} {...el}/>)
                    }
                </div>
                <Paper style={{width: 300}} className="p-20 mb-20" elevation={0}>
                    <b>Подписчики</b>
                    <div className="d-flex mt-15">
                        <Avatar
                            className="mr-10"
                            src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"
                        />
                        <Avatar
                            className="mr-10"
                            src="https://leonardo.osnova.io/2d20257c-fec5-4b3e-7f60-055c86f24a4d/-/scale_crop/108x108/-/format/webp/"
                        />
                    </div>
                </Paper>
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

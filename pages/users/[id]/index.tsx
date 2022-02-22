import Link from 'next/link';
import {Avatar, Button, Paper, Typography} from '@material-ui/core';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import Tab from '@mui/material/Tab';
import {SettingsOutlined as SettingsIcon} from '@material-ui/icons';
import {MainLayout} from '../../../layouts/MainLayout';
import {Api} from "../../../utils/api";
import {GetServerSideProps} from "next";
import {useAppSelector} from "../../../redux/hooks";
import {selectUserData} from "../../../redux/slices/user";
import {Post} from "../../../components/Post";
import {ArticleResponse} from "../../../utils/api/types";
import {FollowButton} from "../../../components/FollowButton";
import {useState} from 'react';
import {CommentsList} from "../../../components/CommentsList";
import Box from '@mui/material/Box';


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
    const [tabIndex, setTabIndex] = useState('0');
    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    const currentUser = useAppSelector(selectUserData)

    return (
        <MainLayout contentFullWidth hideComments>
            <Paper className="pl-20 pr-20 pt-20 mb-5" elevation={0}>
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
                            <Link href='/users/settings'>
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
               <Box>
                   <TabContext value={tabIndex}>
                       <TabList onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                           <Tab label="Статьи" value={'0'} />
                           <Tab label="Комментарии" value={'1'}/>
                       </TabList>
                       <TabPanel value="0">
                           <div className="d-flex align-start">
                               <div className="flex">
                                   {
                                       user.articles.map(el => <Post key={el.id} title={el.title} user={user}
                                                                     description={el.description} id={el.id} {...el}/>)
                                   }
                               </div>
                           </div>
                       </TabPanel>
                       <TabPanel value="1">
                           <CommentsList userId={user.id}/>
                       </TabPanel>
                   </TabContext>
               </Box>
            </Paper>
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

import Link from 'next/link';
import {Avatar, Button, Paper, Typography} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import Tab from '@mui/material/Tab';
import {SettingsOutlined as SettingsIcon} from '@material-ui/icons';
import {MainLayout} from '../../../layouts/MainLayout';
import {Api} from "../../../utils/api";
import {GetServerSideProps} from "next";
import {useAppSelector} from "../../../redux/hooks";
import {selectUserData} from "../../../redux/slices/user";
import {ArticleResponse} from "../../../utils/api/types";
import {FollowButton} from "../../../components/FollowButton";
import {useState} from 'react';
import {CommentsList} from "../../../components/CommentsList";
import Box from '@mui/material/Box';
import {ArticlesList} from '../../../components/ArticlesList';


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

export default function Profile({user, comments, articles, articlesCount}) {

    const [tabIndex, setTabIndex] = useState('0');
    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    const currentUser = useAppSelector(selectUserData)
    const requestArticles = async (take: number, currentPage: number): Promise<[Array<ArticleResponse>, number]> => {
        const [data, count] = await Api().article.getArticlesByUserId(user.id, take, currentPage)
        return [data, count]
    }
    return (
        <MainLayout contentFullWidth>
            <Paper className='p-20'>
                <div className="d-flex justify-between">
                    <Avatar
                        src={user.avatarUrl}
                        style={{width: 300, height: 300, borderRadius: 6}}
                    >
                        {!!user.fullName && user?.fullName[0]}
                    </Avatar>
                    <div className='mb-25'>
                        <Typography style={{fontWeight: 'bold'}} className="mt-20" variant="h4">
                            {!!user.fullName && user.fullName}
                        </Typography>
                        <div>
                            <div>
                                <Link href={`/users/${user.id}/following`}>
                                    <a>
                                        <span>Подписки:</span> <span>{user.following.length}</span>
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Link href={`/users/${user.id}/followers`}>
                                    <a>
                                        <span>Подписчики:</span> <span>{user.followers.length}</span>
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <span>Обо мне:</span> {user.about}
                            </div>
                            <div>
                                <span>Ссылка:</span> {user.link}
                            </div>

                        </div>
                    </div>
                    <div>
                        {currentUser && user.id === currentUser.id &&
                            <Link href='/users/settings'>
                                <Button>
                                    <SettingsIcon/>
                                </Button>
                            </Link>}
                        {!currentUser?.id === user.id && <FollowButton id={user.id}/>}
                    </div>
                </div>
            </Paper>
            <Box>
                <TabContext value={tabIndex}>
                    <Paper>
                        <TabList onChange={handleChange} indicatorColor="primary" textColor="primary"
                                 variant="fullWidth">
                            <Tab label="Статьи" value={'0'}/>
                            <Tab label="Комментарии" value={'1'}/>
                        </TabList>
                    </Paper>
                    <TabPanel value="0">
                        <div className="d-flex align-start">
                            <div className="flex">
                                {
                                    <ArticlesList articles={articles}
                                                  count={articlesCount}
                                                  requestHandler={requestArticles}/>
                                }
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <CommentsList initialComments={comments} userId={user.id}/>
                    </TabPanel>
                </TabContext>
            </Box>
        </MainLayout>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = +ctx.params.id

        const user = await Api().users.getUserData(id)
        const comments = await Api().comment.getCommentsByUserId(id)
        const [articles, articlesCount] = await Api().article.getArticlesByUserId(id)

        return {
            props: {user, comments, articles, articlesCount}
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

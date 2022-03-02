import React from 'react';
import styles from './Post.module.scss';
import Link from 'next/link';
import {Avatar, Paper, Typography} from '@mui/material';
import {PostActions} from '../PostActions/PostActions';
import {UserResponse} from "../../utils/api/types";
import {FollowButton} from '../FollowButton';

interface PostProps {
    id: number
    title: string
    description: string
    tags?: Array<string>
    imageUrl?: string
    user: UserResponse
    likes: Array<number> | []
    dislikes: Array<number> | []
    removeArticleHandler: (id: number) => any
    createdAt:string
}

export const Post: React.FC<PostProps> = ({
                                              removeArticleHandler, id, title,
                                              description, tags, imageUrl,
                                              user, likes, dislikes, createdAt, ...obj
                                          }) => {
    const images = obj['body']?.filter(el => el.type === 'image')?.map(el => el.data.file.url)
    return (
        <Paper elevation={8} className="p-40" classes={{root: styles.paper}}>
            <div className={styles.postWrapper}>
                <div className={styles.postHeader}>
                    <Link href={`/users/${user.id}`}>
                        <div className={styles.postHeaderUser}>
                            <Avatar style={{width:50,height:50}} src={user.avatarUrl}>
                                {user.fullName}
                            </Avatar>
                            <p>{user.fullName}</p>
                        </div>
                    </Link>
                    <p>{createdAt}</p>
                    <FollowButton id={user.id}/>
                </div>
                <Typography variant="h5" className={styles.title}>
                    <div className={styles.titleHeader}>
                        <Link href={`/news/${id}`}>
                            <a>
                                {title}
                            </a>
                        </Link>
                    </div>
                </Typography>
                <Typography className="mt-10 mb-15">
                    {description}
                </Typography>
                {!!images &&
                    <div className={styles.imageContainer}>{images.map(el => < img key={el} src={el} alt=""/>)}</div>}
                <PostActions likes={likes} dislikes={dislikes} removeArticleHandler={removeArticleHandler}
                             articleId={id} userId={user.id}/>
            </div>
        </Paper>
    );
};

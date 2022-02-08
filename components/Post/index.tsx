import React from 'react';
import Link from 'next/link';
import {Avatar, Button, Paper, Typography} from '@material-ui/core';

import styles from './Post.module.scss';
import {PostActions} from '../PostActions/PostActions';
import {LoginUserResponse} from "../../utils/api/types";

interface PostProps {
    id: number
    title: string
    description: string
    tags?: Array<string>
    imageUrl?: string
    user: LoginUserResponse
    likes: Array<number> | []
    dislikes: Array<number> | []
    removeArticleHandler: (id: number) => any
}

export const Post: React.FC<PostProps> = ({
                                              removeArticleHandler, id, title,
                                              description, tags, imageUrl,
                                              user,likes,dislikes, ...obj
                                          }) => {
    const firstImage = obj['body']?.find(el => el.type === 'image')?.data.file.url
    return (
        <Paper elevation={0} className="p-20" classes={{root: styles.paper}}>
            <div className={styles.postWrapper}>
                <div className={styles.postHeader}>
                    <Link href={`/users/${user.id}`}>
                        <div className={styles.postHeaderUser}>
                            <Avatar src={user.avatarUrl}>
                                {user.fullName}
                            </Avatar>
                            <p>{user.fullName}</p>
                        </div>
                    </Link>
                    <p>time</p>
                    <Button>
                        Подписаться +
                    </Button>
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
                {!!firstImage && <div className={styles.imageContainer}><img src={firstImage} alt=""/></div>}
                <PostActions likes={likes} dislikes={dislikes} removeArticleHandler={removeArticleHandler} articleId={id} userId={user.id}/>
            </div>
        </Paper>
    );
};

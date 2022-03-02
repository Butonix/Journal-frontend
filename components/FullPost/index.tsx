import React from 'react';
import styles from './FullPost.module.scss';

import {PostActions} from '../PostActions/PostActions';
import {FollowButton} from "../FollowButton";
import {ArticleResponse} from "../../utils/api/types";
import {Avatar, Paper, Typography } from '@mui/material';

interface FullPostProps {
    article: ArticleResponse | any
}

export const FullPost: React.FC<FullPostProps> = ({article}) => {
    return (
        <Paper elevation={2} className={styles.paper}>
            <div style={{margin: '0 auto', width: 680}}>
                <Typography variant="h4" className={styles.title}>
                    {article.title}
                </Typography>
                <div>
                    {article.body.map(el => {
                            if (el.type === 'image') {
                                return <div key={el.id} className={styles.editorImage}>
                                    <img alt={el.data.caption} src={el.data.file.url}/>
                                    <span>{!!el.data.caption && el.data.caption}</span>
                                </div>
                            } else if (el.type === 'paragraph') {
                                return <Typography className={styles.paragraph} key={el.id}>
                                    {el.data.text}
                                </Typography>
                            } else if (el.type === 'code') {
                                return <pre className={styles.code} key={el.id}>
                                    {el.data.code}
                                </pre>
                            }
                        }
                    )
                    }
                    <div style={{width: 250, marginLeft: -14}}>
                        <PostActions
                            likes={article.likes}
                            dislikes={article.dislikes}
                            removeArticleHandler={() => {
                            }}
                            articleId={article.id}
                            userId={article.user.id}/>
                    </div>

                    <div className="d-flex justify-between align-center mt-30 mb-30">
                        <div className={styles.userInfo}>
                            <Avatar src={article.user.avatarUrl}>{article.user.fullName[0]}</Avatar>
                            <b>{article.user.fullName}</b>
                        </div>
                        <div>
                            <FollowButton id={article.user.id}/>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

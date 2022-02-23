import {Avatar, Button, Paper, Typography} from '@material-ui/core';
import React from 'react';
import {PostActions} from '../PostActions/PostActions';
import MessageIcon from '@material-ui/icons/TextsmsOutlined';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';

import styles from './FullPost.module.scss';
import {FollowButton} from "../FollowButton";

export const FullPost = ({article}) => {
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
                            } else if (el.type === 'code'){
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

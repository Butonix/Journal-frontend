import React from 'react';
import Link from 'next/link';
import {Paper, Typography} from '@material-ui/core';
import Image from 'next/image';

import styles from './Post.module.scss';
import {PostActions} from '../PostActions';
import {LoginUserResponse} from "../../utils/api/types";

interface PostProps {
    id: number
    title: string
    description: string
    tags?: Array<string>
    imageUrl?: string
    user:LoginUserResponse
}

export const Post: React.FC<PostProps> = ({id, title, description, tags, imageUrl,user}) => {
    return (
        <Paper elevation={0} className="p-20" classes={{root: styles.paper}}>
            <Typography variant="h5" className={styles.title}>
                <div className={styles.titleHeader}>
                    <Link href={`/news/${id}`}>
                        <a>
                            {title}
                        </a>
                    </Link>
                    <Link href={`/users/${user.id}`}>
                        <a>
                            {user.fullName}
                        </a>
                    </Link>
                </div>
            </Typography>
            <Typography className="mt-10 mb-15">
                {description}
            </Typography>
            {imageUrl && <Image
                src={imageUrl}
                height={500}
                width={600}
            />}
            <PostActions/>
        </Paper>
    );
};

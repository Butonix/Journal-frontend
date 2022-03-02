import React, {useState} from 'react';
import Link from 'next/link';
import styles from './PostActions.module.scss'
import {IconButton} from '@mui/material';
import {
    BookmarkBorderOutlined,
    DeleteForeverOutlined,
    EditOutlined,
    ModeCommentOutlined as CommentsIcon,
    ThumbDownOutlined,
    ThumbUpOutlined
} from '@mui/icons-material';
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {Api} from "../../utils/api";


interface PostActionProps {
    userId: number
    articleId: number
    removeArticleHandler: (id: number) => any
    likes: Array<number> | []
    dislikes: Array<number> | []
}

export const PostActions: React.FC<PostActionProps> = ({likes, dislikes, userId, articleId, removeArticleHandler}) => {
    const currentUserId = useAppSelector(selectUserData)?.id

    const [isLike, setIsLike] = useState(likes.some(el => el === currentUserId))
    const [likeCount, setLikeCount] = useState(likes.length)

    const [isDislike, setIsDislike] = useState(dislikes.some(el => el === currentUserId))
    const [dislikeCount, setDislikeCount] = useState(dislikes.length)


    const removeArticle = async () => {
        await Api().article.removeArticle(articleId)
        await removeArticleHandler(articleId)
    }
    const likeArticle = async () => {
        await Api().article.likeArticle(articleId)
        setIsLike(prev => !prev)
        if (!isLike) {
            setLikeCount(prev => prev += 1)
        } else {
            setLikeCount(prev => prev -= 1)
        }
    }
    const dislikeArticle = async () => {
        await Api().article.dislikeArticle(articleId)
        setIsDislike(prev => !prev)
        if (!isDislike) {
            setDislikeCount(prev => prev += 1)
        } else {
            setDislikeCount(prev => prev -= 1)
        }
    }

    if (userId === currentUserId) {
        return (
            <ul className={styles.actions}>
                <li>
                    <Link href={`/news/${articleId}`}>
                        <IconButton>
                            <CommentsIcon/>
                        </IconButton>
                    </Link>
                </li>
                <li>
                    <IconButton onClick={likeArticle}>
                        <ThumbUpOutlined color={isLike ? 'primary' : 'inherit'}/>
                        <span className={styles.count}>{likeCount}</span>
                    </IconButton>
                </li>
                <li>
                    <IconButton onClick={dislikeArticle}>
                        <ThumbDownOutlined color={isDislike ? 'error' : 'inherit'}/>
                        <span className={styles.count}>{dislikeCount}</span>
                    </IconButton>
                </li>
                <li>
                    <Link href={`/write/${articleId}`}>
                        <IconButton>
                            <EditOutlined/>
                        </IconButton>
                    </Link>
                </li>
                <li>
                    <IconButton onClick={removeArticle}>
                        <DeleteForeverOutlined/>
                    </IconButton>
                </li>
            </ul>
        )
    }
    return (
        <ul className={styles.actions}>
            <li>
                <Link href={`/news/${articleId}`}>
                    <IconButton>
                        <CommentsIcon/>
                    </IconButton>
                </Link>
            </li>
            <li>
                <IconButton onClick={likeArticle}>
                    <ThumbUpOutlined color={isLike ? 'primary' : 'inherit'}/>
                    <span className={styles.count}>{likeCount}</span>
                </IconButton>
            </li>
            <li>
                <IconButton onClick={dislikeArticle}>
                    <ThumbDownOutlined color={isDislike ? 'error' : 'inherit'}/>
                    <span className={styles.count}>{dislikeCount}</span>
                </IconButton>
            </li>
            <li>
                <IconButton>
                    <BookmarkBorderOutlined/>
                </IconButton>
            </li>
        </ul>
    );
};

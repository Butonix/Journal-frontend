import React, {CSSProperties} from 'react';
import {IconButton} from '@material-ui/core';
import {
    BookmarkBorderOutlined,
    DeleteForeverOutlined,
    EditOutlined,
    ModeCommentOutlined as CommentsIcon,
    ThumbDownOutlined,
    ThumbUpOutlined
} from '@material-ui/icons';
import {useAppSelector} from "../redux/hooks";
import {selectUserData} from "../redux/slices/user";
import Link from 'next/link';
import {Api} from "../utils/api";


const styles: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    top: '5',
    listStyle: 'none',
    padding: '0',
    margin: '0',
};

interface PostActionProps {
    userId: number
    articleId:number
    removeArticleHandler:(id:number)=>any
}

export const PostActions: React.FC<PostActionProps> = ({userId,articleId,removeArticleHandler}) => {
    const currentUserId = useAppSelector(selectUserData)?.id

    const removeArticle = async () => {
        await Api().article.removeArticle(articleId)
        await removeArticleHandler(articleId)
    }
    if (userId === currentUserId) {
        return (
            <ul style={styles}>
                <li>
                    <Link href={`/news/${articleId}`}>
                        <IconButton>
                            <CommentsIcon/>
                        </IconButton>
                    </Link>
                </li>
                <li>
                    <IconButton>
                        <ThumbUpOutlined/>
                    </IconButton>
                </li>
                <li>
                    <IconButton>
                        <ThumbDownOutlined/>
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
        <ul style={styles}>
            <li>
                <Link href={`/news/${articleId}`}>
                    <IconButton>
                        <CommentsIcon/>
                    </IconButton>
                </Link>
            </li>
            <li>
                <IconButton>
                    <ThumbUpOutlined/>
                </IconButton>
            </li>
            <li>
                <IconButton>
                    <ThumbDownOutlined/>
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

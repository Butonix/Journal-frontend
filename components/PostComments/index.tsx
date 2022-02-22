import {Divider, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import {Comment, CommentProps} from "../Comment";
import React, {useEffect, useState} from "react";
import {AddCommentForm} from "../AddCommentForm";
import {Api} from "../../utils/api";
import {CommentResponse} from "../../utils/api/types";

interface PostCommentsProps {
    articleId: number
}


export const PostComments: React.FC<PostCommentsProps> = ({articleId}) => {
    const [comments, setComments] = useState<CommentResponse[]>([])
    useEffect( () => {
        Api().comment.getComments(articleId)
            .then(comments=>setComments(comments))
    }, [])
    const onAddComment = (newComment) => {
        setComments(prev=>[newComment,...prev])
    }
    const onRemoveHandler = (id) => {
        setComments(prev=>[...prev.filter(el=>el.id !== id)])
    }
    return (
        <Paper elevation={0} className="mt-40 p-30">
            <div className="comment-container">
                <Typography variant="h6" className="mb-20">
                    {comments.length} комментарий
                </Typography>
                <Divider/>
                <AddCommentForm onAddComment={onAddComment} articleId={articleId}/>
                <div className="mb-20"/>
                {comments && comments.map(el => <Comment
                    onRemoveHandler={onRemoveHandler}
                    id={el.id}
                    createdAt={el.createdAt}
                    text={el.text}
                    user={el.user}
                    key={el.id}
                />)}
            </div>
        </Paper>
    )
}
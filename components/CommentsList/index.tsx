import React, {useEffect, useState} from "react";
import {Api} from "../../utils/api";
import {CommentItem} from "../CommentItem";
import {CommentResponse} from "../../utils/api/types";

interface CommentsListProps {
    userId: number
    initialComments: Array<CommentResponse> | []
}

export const CommentsList: React.FC<CommentsListProps> = ({userId, initialComments}) => {

    const [comments, setComments] = useState(initialComments)

    useEffect(() => {
        (async () => {
            const response = await Api().comment.getCommentsByUserId(userId)
            setComments(response)
        })()
    }, [userId])

    return (
        <div>
            {!!comments.length && comments.map(el => <CommentItem key={el.id}
                                                                  text={el.text}
                                                                  user={el.user}
                                                                  title={el.article.title}/>)}
        </div>
    )
}
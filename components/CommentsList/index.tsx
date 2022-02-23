import {useEffect, useState} from "react";
import { Api } from "../../utils/api";
import {CommentItem} from "../CommentItem";

export const CommentsList = ({userId,initialComments}) => {
    const [comments,setComments] = useState(initialComments)
    useEffect(()=>{
        (async ()=>{
            const response = await Api().comment.getCommentsByUserId(userId)
            setComments(response)
        })()
    },[userId])
    return (
        <div>
            {!!comments.length && comments.map(el=> <CommentItem key={el.id} text={el.text} user={el.user} title={el.article.title} />)}
        </div>
    )
}
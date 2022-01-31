import {Divider, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import {Comment, CommentProps} from "../Comment";
import React, {useState} from "react";
import {AddCommentForm} from "../AddCommentForm";

interface PostCommentsProps {
    items: Array<CommentProps>
}


export const PostComments: React.FC<PostCommentsProps> = ({items}) => {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <Paper elevation={0} className="mt-40 p-30">
            <div className="comment-container">
                <Typography variant="h6" className="mb-20">
                    42 комментария
                </Typography>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(_, newValue) => setActiveTab(newValue)}
                    value={activeTab}>
                    <Tab label="Популярные"/>
                    <Tab label="По порядку"/>
                </Tabs>
                <Divider/>
                <AddCommentForm/>
                <div className="mb-20"/>
                {items && items.map(el => <Comment
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
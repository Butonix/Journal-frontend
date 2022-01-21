import {MainLayout} from '../../layouts/MainLayout';
import {FullPost} from '../../components/FullPost';
import {CommentProps} from '../../components/Comment';
import React from 'react';
import {PostComments} from '../../components/PostComments';

const items: Array<CommentProps> = [
    {
        user: {
            fullName: 'denis',
            avatar: "https://sun9-78.userapi.com/impf/c846417/v846417394/1764c7/Xc6RjFLao3o.jpg?size=750x750&quality=96&sign=eb2c94a9d447885122c850a7af857a14&type=album"
        },
        text: 'comment text',
        createdAt: '5 часов',
        id: 1
    },
    {
        user: {
            fullName: 'katy',
            avatar: "https://sun9-78.userapi.com/impf/c846417/v846417394/1764c7/Xc6RjFLao3o.jpg?size=750x750&quality=96&sign=eb2c94a9d447885122c850a7af857a14&type=album"
        },
        text: 'comment2 text',
        createdAt: '3 часв',
        id: 2
    },
    ]
export default function Home() {
    return (
        <MainLayout contentFullWidth>
            <FullPost/>
            <PostComments items={items}/>
        </MainLayout>
    );
}

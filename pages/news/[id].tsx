import {MainLayout} from '../../layouts/MainLayout';
import {FullPost} from '../../components/FullPost';
import React from 'react';
import {PostComments} from '../../components/PostComments';
import {GetServerSideProps} from "next";
import {Api} from "../../utils/api";

export default function Home({article}) {
    return (
        <MainLayout contentFullWidth>
            <FullPost article={article}/>
            <PostComments articleId={article.id}/>
        </MainLayout>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = ctx.params.id
        const article = await Api().article.getArticlesById(+id)
        return {
            props: {article}
        }
    } catch (e) {
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false,
            },
        };

    }
}

import {NextPage} from "next";
import {useState} from "react";
import {ArticlesList} from "../../components/ArticlesList";
import {Post} from "../../components/Post";
import {MainLayout} from "../../layouts/MainLayout";
import {Api} from "../../utils/api";
import {ArticleResponse} from "../../utils/api/types";

interface PopularPageProps {
    articles: Array<ArticleResponse>
    countArticles: number
}

const FeedPage: NextPage<PopularPageProps> = ({articles, countArticles}) => {
    const requestHandler = async (limit: number, currentPage: number): Promise<[Array<ArticleResponse>, number]> => {
        const [data, count] = await Api().article.getFeed(limit, currentPage)
        return [data, count]
    }
    return (
        <MainLayout>
            <ArticlesList articles={articles} count={countArticles} requestHandler={requestHandler}/>
        </MainLayout>
    );
}

export const getServerSideProps = async (ctx) => {
    try {
        const [data, count] = await Api(ctx).article.getFeed();
        return {
            props: {
                articles: data,
                countArticles: count
            },
        };
    } catch (err) {
        console.log(err);
    }
    return {
        props: {
            articles: null,
        },
    };
};

export default FeedPage;


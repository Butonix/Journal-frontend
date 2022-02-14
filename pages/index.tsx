import {Post} from '../components/Post';
import {MainLayout} from '../layouts/MainLayout';
import {Api} from "../utils/api";
import {ArticleResponse} from "../utils/api/types";
import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import {getTotalPages} from "../utils/pagination/getTotalPages";
import {usePagination} from "../hooks/usePagination";
import {ArticlesList} from "../components/ArticlesList";

interface HomeProps {
    articles: Array<ArticleResponse>
    countData: number
}

const Home: NextPage<HomeProps> = ({articles, countData}) => {
    const requestHandler = async (limit: number, currentPage: number): Promise<[Array<ArticleResponse>, number]> => {
        const [data, count] = await Api().article.getArticles(limit, currentPage)
        return [data, count]
    }
    return (
        <MainLayout>
            <ArticlesList articles={articles} count={countData} requestHandler={requestHandler}/>
        </MainLayout>
    );
}

export const getServerSideProps = async (ctx) => {
    try {
        const [data, countData] = await Api().article.getArticles();
        return {
            props: {
                articles: data,
                countData
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

export default Home;


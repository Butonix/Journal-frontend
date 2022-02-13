import {Post} from '../components/Post';
import {MainLayout} from '../layouts/MainLayout';
import {Api} from "../utils/api";
import {ArticleResponse} from "../utils/api/types";
import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import {getTotalPages} from "../utils/pagination/getTotalPages";
import {usePagination} from "../hooks/usePagination";

interface HomeProps {
    articles: Array<ArticleResponse>
    count: number
}

const Home: NextPage<HomeProps> = ({articles, count}) => {
    const {
        take: limit,
        currentPage,
        setData: setArrayArticles,
        setCurrentPage,
        data: arrayArticles,
        pageCount
    } = usePagination(articles, count)
    useEffect(() => {
        (async () => {
            const [data, count] = await Api().article.getArticles(limit, currentPage)
            setArrayArticles(data)
        })()
    }, [currentPage])
    const removeArticleHandler = (id) => {
        setArrayArticles(prev => [...prev.filter(el => el.id !== id)])
    }
    const changePageHandler = (_, value) => {
        setCurrentPage(value)
    }
    return (
        <MainLayout>
            {arrayArticles && arrayArticles.map(obj => <Post removeArticleHandler={removeArticleHandler} key={obj.id}
                                                             id={obj.id} title={obj.title}
                                                             description={obj.description}
                                                             user={obj.user} {...obj}/>)}
            <Pagination
                defaultValue={currentPage}
                onChange={changePageHandler}
                count={pageCount}
            />
        </MainLayout>
    );
}

export const getServerSideProps = async (ctx) => {
    try {
        const [data, count] = await Api().article.getArticles(10, 1);
        return {
            props: {
                articles: data,
                count
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


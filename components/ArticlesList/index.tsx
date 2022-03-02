import React, {useEffect} from "react";
import {Post} from "../Post";
import {Pagination, Paper} from "@mui/material";
import {usePagination} from "../../hooks/usePagination";
import {ArticleResponse} from "../../utils/api/types";

interface ArticlesListProps {
    articles: Array<ArticleResponse> | []
    count: number
    requestHandler: (take: number, currentPage: number) => Promise<[Array<ArticleResponse>, number]>
}

export const ArticlesList: React.FC<ArticlesListProps> = ({articles, count, requestHandler}) => {
    const {
        take,
        currentPage,
        setData: setArrayArticles,
        setCurrentPage,
        data: arrayArticles,
        pageCount
    } = usePagination(articles, count)

    const removeArticleHandler = (id) => {
        setArrayArticles(prev => [...prev.filter(el => el.id !== id)])
    }
    const changePageHandler = (_, value) => {
        setCurrentPage(value)
    }
    useEffect(() => {
        (async () => {
            const [articles] = await requestHandler(take, currentPage)
            setArrayArticles(articles)
        })()
    }, [currentPage])

    return (
        <>
            {arrayArticles &&
                arrayArticles.map(obj => <Post key={obj.id}
                                               id={obj.id}
                                               title={obj.title}
                                               description={obj.description}
                                               user={obj.user}
                                               removeArticleHandler={removeArticleHandler}
                                               {...obj}
                />)}
            {!!count && <Paper>
                <Pagination
                    variant="outlined"
                    color="primary"
                    className={'d-flex justify-center p-10'}
                    defaultValue={currentPage}
                    onChange={changePageHandler}
                    count={pageCount}
                />
            </Paper>}
        </>
    )
}
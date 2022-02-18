import {NextPage} from "next";
import {ArticlesList} from "../../components/ArticlesList";
import {MainLayout} from "../../layouts/MainLayout";
import {Api} from "../../utils/api";
import {ArticleResponse} from "../../utils/api/types";

interface ArticlesPageProps {
    articles: Array<any>
    articlesCount: number
    keyword:string
}

const ArticlesPage: NextPage<ArticlesPageProps> = ({articles, articlesCount,keyword}) => {

    const requestHandler = async (take: number, currentPage: number): Promise<[Array<ArticleResponse>, number]> => {
        const [data, count] = await Api().article.getArticles(take, currentPage,keyword)
        return [data, count]
    }

    return (
        <MainLayout>
            <ArticlesList articles={articles} count={articlesCount} requestHandler={requestHandler}/>
        </MainLayout>
    );
}

export const getServerSideProps = async (ctx) => {
    try {
        const [articles, articlesCount] = await Api().article.getArticles(10,1,ctx.query.keyword);
        return {
            props: {
                articles,
                articlesCount,
                keyword:ctx.query.keyword || ''
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

export default ArticlesPage;
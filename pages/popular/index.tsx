import {NextPage} from "next";
import {ArticlesList} from "../../components/ArticlesList";
import {MainLayout} from "../../layouts/MainLayout";
import {Api} from "../../utils/api";
import {ArticleResponse} from "../../utils/api/types";

interface PopularPageProps {
    articles: Array<ArticleResponse>
    articlesCount: number
}

const PopularPage: NextPage<PopularPageProps> = ({articles, articlesCount}) => {

    const requestHandler = async (take: number, currentPage: number): Promise<[Array<ArticleResponse>, number]> => {
        const [data, count] = await Api().article.getPopular(take, currentPage)
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
        const [articles, articlesCount] = await Api().article.getPopular();
        return {
            props: {
                articles,
                articlesCount
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

export default PopularPage;


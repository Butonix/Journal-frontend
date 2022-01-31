import {Post} from '../components/Post';
import {MainLayout} from '../layouts/MainLayout';
import {Api} from "../utils/api";
import {ArticleResponse} from "../utils/api/types";
import {NextPage} from "next";

interface HomeProps {
    articles:Array<ArticleResponse>
}
const Home:NextPage<HomeProps> = ({articles}) => {
    return (
        <MainLayout>
            {articles.map(obj=><Post key={obj.id} id={obj.id} title={obj.title} description={obj.description}/>)}
        </MainLayout>
    );
}

export const getServerSideProps = async (ctx) => {
    try {
        const articles = await Api().article.getArticles();
        return {
            props: {
                articles,
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


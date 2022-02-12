import {NextPage} from "next";
import {useState} from "react";
import {Post} from "../../components/Post";
import {MainLayout} from "../../layouts/MainLayout";
import {Api} from "../../utils/api";

interface PopularPageProps {
    articles: Array<any>
}

const PopularPage: NextPage<PopularPageProps> = ({articles}) => {
    const [arrayArticles, setArrayArticles] = useState(articles)
    const removeArticleHandler = (id) => {
        setArrayArticles(prev => [...prev.filter(el => el.id !== id)])
    }
    return (
        <MainLayout>
            {arrayArticles && arrayArticles.map(obj => <Post removeArticleHandler={removeArticleHandler} key={obj.id}
                                                             id={obj.id} title={obj.title}
                                                             description={obj.description}
                                                             user={obj.user} {...obj}/>)}
        </MainLayout>
    );
}

export const getServerSideProps = async (ctx) => {
    try {
        const {articles} = await Api().article.getPopular();
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

export default PopularPage;


// interface WritePageProps  {
//
// }
import {GetServerSideProps, NextPage} from "next"
import {MainLayout} from "../../layouts/MainLayout";
import {WriteForm} from "../../components/WriteForm";
import {Api} from "../../utils/api";
import {ArticleResponse} from "../../utils/api/types";

interface WritePageProps{
    article: ArticleResponse
}
const WritePage: NextPage<WritePageProps> = ({article}) => {
    return (
        <div>
            <MainLayout className='main-layout--white' hideMenu hideComments>
                <WriteForm data={article}/>
            </MainLayout>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = ctx.params.id
        const article = await Api().article.getArticlesById(+id)
        const {id:meId} = await Api(ctx).auth.getMe()
        if(article.user.id !== +meId){
            return{
                props:{},
                redirect:{
                    destination: '/',
                    permanent: false
                }
            }

        }
        return {
            props: {article,id}
        }
    } catch (e) {
        console.log('Write page', e);
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false,
            },
        };

    }
}
export default WritePage
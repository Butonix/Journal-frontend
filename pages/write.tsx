// interface WritePageProps  {
//
// }
import {NextPage} from "next"
import {MainLayout} from "../layouts/MainLayout";
import {WriteForm} from "../components/WriteForm";


const WritePage: NextPage = () => {
    return (
        <div>
            <MainLayout className='main-layout--white' hideMenu hideComments>
                <WriteForm/>
            </MainLayout>
        </div>
    )
}
export default WritePage
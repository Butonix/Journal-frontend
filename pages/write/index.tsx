// interface WritePageProps  {
//
// }
import {NextPage} from "next"
import {MainLayout} from "../../layouts/MainLayout";
import {WriteForm} from "../../components/WriteForm";
import {useEffect} from "react";
import {Api} from "../../utils/api";


const WritePage: NextPage = () => {
    useEffect( ()=>{
        const me = Api().auth.getMe()
    },[])
    return (
        <div>
            <MainLayout className='main-layout--white' hideMenu hideComments>
                <WriteForm/>
            </MainLayout>
        </div>
    )
}
export default WritePage
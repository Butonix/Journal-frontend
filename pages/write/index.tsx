// interface WritePageProps  {
//
// }
import {NextPage} from "next"
import {MainLayout} from "../../layouts/MainLayout";
import {WriteForm} from "../../components/WriteForm";
import {useEffect} from "react";
import {Api} from "../../utils/api";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";


const WritePage: NextPage = () => {
    const currentUser = useAppSelector(selectUserData)
    return (
        <div>
            <MainLayout className='main-layout--white' hideMenu hideComments>
                {currentUser && <WriteForm/>}
            </MainLayout>
        </div>
    )
}
export default WritePage
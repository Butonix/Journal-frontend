import {MainLayout} from "../../../layouts/MainLayout";
import {UsersList} from "../../../components/UsersList";
import {useRouter} from "next/router";
import {Api} from "../../../utils/api";
import {useEffect, useState} from "react";

export default function FollowersPage() {
    const [users,setUsers] = useState([])
    const userId = useRouter().query.id
    useEffect(()=>{
        (async ()=>{
            const response = await Api().users.getFollowers(+userId)
            setUsers(response)
        })()
    },[])
    return (
        <MainLayout>
            <UsersList usersList={users} />
        </MainLayout>
    )
}
import {MainLayout} from "../../layouts/MainLayout";
import {UsersList} from "../../components/UsersList";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Api} from "../../utils/api";

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const userId = useRouter().query.id
    useEffect(() => {
        (async () => {
            const response = await Api().users.getAllUsers()
            setUsers(response)
        })()
    }, [])
return (
    <MainLayout>
        <UsersList usersList={users}/>
    </MainLayout>
)
}
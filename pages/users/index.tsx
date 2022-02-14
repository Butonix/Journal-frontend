import {MainLayout} from "../../layouts/MainLayout";
import {UsersList} from "../../components/UsersList";
import React from "react";
import {Api} from "../../utils/api";

export default function UsersPage({users}) {
    const requestHandler = async (take,page) => {
        return await Api().users.getAllUsers(take,page)
    }
    console.log(users)
    return (
        <MainLayout>
            <UsersList usersList={users} requestHandler={requestHandler}/>
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    try {

        const users = await Api().users.getAllUsers();
        return {
            props: {
                users
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
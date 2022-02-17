import {MainLayout} from "../../layouts/MainLayout";
import {UsersList} from "../../components/UsersList";
import React from "react";
import {Api} from "../../utils/api";

export default function UsersSearchPage({users, fullName, totalCount}) {
    const requestHandler = async (fullName, take, page) => {
        const [data, count] = await Api().users.getAllUsers(fullName, take, page)
        return [data, count]
    }

    return (
        <MainLayout>
            <UsersList usersList={users} requestHandler={requestHandler} keyword={fullName} count={totalCount}/>
        </MainLayout>
    )
}
export const getServerSideProps = async (ctx) => {
    try {

        const [users, count] = await Api().users.getAllUsers(ctx.query.fullName);
        console.log(users, count)
        return {
            props: {
                users,
                fullName: ctx.query.fullName,
                totalCount: count
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
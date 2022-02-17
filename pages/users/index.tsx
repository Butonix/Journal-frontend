import {MainLayout} from "../../layouts/MainLayout";
import {UsersList} from "../../components/UsersList";
import React from "react";
import {Api} from "../../utils/api";

export default function UsersPage({users, totalCount, keyword}) {
    const requestHandler = async (take, page) => {
        const [data, count] = await Api().users.getAllUsers(take, page, keyword)
        return [data, count]
    }

    return (
        <MainLayout>
            <UsersList usersList={users} requestHandler={requestHandler} keyword={keyword} count={totalCount}/>
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    try {

        const [data, count] = await Api().users.getAllUsers(10, 1, ctx.query.keyword);
        return {
            props: {
                users: data,
                totalCount: count,
                keyword: ctx.query.keyword || ''
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
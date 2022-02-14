import { UsersList } from "../../../components/UsersList";
import {MainLayout} from "../../../layouts/MainLayout";
import {useRouter} from "next/router";
import {Api} from "../../../utils/api";
import {useEffect, useState} from "react";

export default function FollowingPage({users,...props}) {

    const userId = useRouter().query.id
    const requestHandler = async (take,page) => {
        return await Api().users.getFollowing(+userId,take,page)
    }
    return (
        <MainLayout>
            <UsersList usersList={users} requestHandler={requestHandler} />
        </MainLayout>
    )
}
export const getServerSideProps = async (ctx) => {
    try {

        const users = await Api().users.getFollowing(ctx.query.id);
        return {
            props: {
                users,
                count:users.length
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
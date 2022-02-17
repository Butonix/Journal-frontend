import { UsersList } from "../../../components/UsersList";
import {MainLayout} from "../../../layouts/MainLayout";
import {useRouter} from "next/router";
import {Api} from "../../../utils/api";
import {useEffect, useState} from "react";

export default function FollowingPage({users,count,...props}) {

    const userId = useRouter().query.id
    const requestHandler = async (take,page) => {
        return await Api().users.getFollowing(+userId,take,page)
    }
    return (
        <MainLayout>
            <UsersList count={count} usersList={users} requestHandler={requestHandler} />
        </MainLayout>
    )
}
export const getServerSideProps = async (ctx) => {
    try {

        const [users,count] = await Api().users.getFollowing(ctx.query.id);
        return {
            props: {
                users,
                count
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
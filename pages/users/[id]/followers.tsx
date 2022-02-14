import {MainLayout} from "../../../layouts/MainLayout";
import {UsersList} from "../../../components/UsersList";
import {useRouter} from "next/router";
import {Api} from "../../../utils/api";
import {useEffect, useState} from "react";

export default function FollowersPage({users}) {

    const userId = useRouter().query.id
    const followersRequestHandler = async (take, page) => {
        return await Api().users.getFollowers(+userId,take,page)
    }

    return (
        <MainLayout>
            <UsersList usersList={users} requestHandler={followersRequestHandler}/>
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    try {

        const users = await Api().users.getFollowers(ctx.query.id);
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
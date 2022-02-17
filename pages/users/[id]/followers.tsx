import {MainLayout} from "../../../layouts/MainLayout";
import {UsersList} from "../../../components/UsersList";
import {useRouter} from "next/router";
import {Api} from "../../../utils/api";
import {useEffect, useState} from "react";

export default function FollowersPage({users,count}) {

    const userId = useRouter().query.id
    const followersRequestHandler = async (take, page) => {
        const [data,count] =  await Api().users.getFollowers(+userId,take,page)
        return [data,count]
    }

    return (
        <MainLayout>
            <UsersList usersList={users} count={count} requestHandler={followersRequestHandler}/>
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    try {

        const [users,count] = await Api().users.getFollowers(ctx.query.id);
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
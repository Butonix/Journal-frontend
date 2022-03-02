import axios, {AxiosInstance} from "axios";
import Cookies, {parseCookies} from 'nookies';
import {GetServerSidePropsContext, NextPageContext} from "next";
import {
    ArticleResponse, CommentResponse,
    CreateArticleDto,
    CreateCommentDto,
    CreateUserDto,
    LoginUserDto,
    UserResponse
} from "./types";


export const Api = (ctx?: NextPageContext | GetServerSidePropsContext) => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies();
    const token = cookies.journalToken;

    const instance = axios.create({
        baseURL: 'http://localhost:7070',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
    return {
        auth: AuthService(instance),
        article: ArticleService(instance),
        comment: CommentsService(instance),
        users: UsersService(instance)
    }
}


export const AuthService = (instance: AxiosInstance) => ({
    async registration(dto: CreateUserDto) {
        const {data} = await instance.post('auth/registration', dto)
        return data
    },

    async login(dto: LoginUserDto): Promise<UserResponse> {
        const {data} = await instance.post('auth/login', dto)
        return data
    },

    async getMe(): Promise<UserResponse> {
        const {data} = await instance.get('users/me')
        return data
    },
})

export const ArticleService = (instance: AxiosInstance) => ({
    async getArticles(take: number = 10, page: number = 1, keyword: string = '') {
        const keywordStr = keyword ? `keyword=${keyword}&` : ''
        const {data} = await instance.get<[Array<ArticleResponse>, number]>(`articles?${keywordStr}take=${take}&page=${page}`)
        return data
    },
    async getPopular(take: number = 10, page: number = 1) {
        const {data} = await instance.get<any>(`articles/popular?take=${take}&page=${page}`)
        return data
    },
    async getFeed(take = 10, currentPage = 1) {
        const {data} = await instance.get<any>(`articles/feed?take=${take}&page=${currentPage}`)
        return data
    },

    async sendArticle(dto: CreateArticleDto) {
        const {data} = await instance.post<CreateArticleDto, { data: ArticleResponse }>('articles', dto)
        return data
    },
    async getArticlesById(id: number) {
        const {data} = await instance.get<ArticleResponse>(`articles/${id}`)
        return data
    },
    async editArticle(dto: CreateArticleDto, id: number) {
        const {data} = await instance.patch<CreateArticleDto, { data: ArticleResponse }>(`articles/${id}`, dto)
        return data
    },
    async removeArticle(articleId: number) {
        const {data} = await instance.delete<CreateArticleDto>(`articles/${articleId}`)
        return data
    },
    async likeArticle(articleId: number) {
        const {data} = await instance.patch<CreateArticleDto>(`articles/${articleId}/like`)
        return data
    },
    async dislikeArticle(articleId: number) {
        const {data} = await instance.patch<CreateArticleDto>(`articles/${articleId}/dislike`)
        return data
    },
    async searchArticles(title: string, take: number = 10, page: number = 1) {
        const {data} = await instance.get<ArticleResponse>(`articles/search/?take=${take}&page=${page}&title=${title}`)
        return data
    },
    async getArticlesByUserId(userId: number,take:number = 10, page:number = 1):Promise<[Array<ArticleResponse>,number]> {
        const {data} = await instance.get(`articles/u?userId=${userId}&take=${take}&page=${page}`)
        return data
    }
})

export const CommentsService = (instance: AxiosInstance) => ({
    async createComment(comment) {
        const {data} = await instance.post<CreateCommentDto, { data: CommentResponse }>('comments', comment)
        return data
    },
    async getComments(articleId?: number) {
        const {data} = await instance.get<number, { data: Array<CommentResponse> }>(articleId ? `comments?articleId=${articleId}` : `comments`)
        return data
    },
    async getCommentsByUserId(userId?: number) {
        const {data} = await instance.get<number, { data: Array<CommentResponse> }>(`comments/u?userId=${userId}`)
        return data
    },
    async removeComment(commentId) {
        const {data} = await instance.delete<number, { data: Array<CommentResponse> }>(`comments/${commentId}`)
        return data
    },
})

export const UsersService = (instance: AxiosInstance) => ({
    async getUserData(id: number) {
        const {data} = await instance.get<{ data: UserResponse }>(`users/${id}`)
        return data
    },
    async editUserProfile(obj) {
        const {data} = await instance.patch<{ data: UserResponse }>(`users/me`, obj)
        return data
    },
    async followUser(obj: { id: number }) {
        const {data} = await instance.patch<{ data: UserResponse }>(`users/follow`, obj)
        return data
    },
    async unfollowUser(obj: { id: number }) {
        const {data} = await instance.patch<{ data: UserResponse }>(`users/unfollow`, obj)
        return data
    },
    async getFollowers(id: number, take: number = 10, page: number = 1) {
        const {data} = await instance.get(`users/${id}/followers?take=${take}&page=${page}`)
        return data
    },
    async getFollowing(id: number, take: number = 10, page: number = 1) {
        const {data} = await instance.get(`users/${id}/following?take=${take}&page=${page}`)
        return data
    },
    async getAllUsers(take: number = 10, page: number = 1, keyword: string = '') {
        const keywordStr = keyword ? `keyword=${keyword}&` : ''
        const {data} = await instance.get(`users?${keywordStr}take=${take}&page=${page}`)
        return data
    },
    // async searchUsers(fullName: string, take: number = 10, page: number = 1) {
    //     const {data} = await instance.get(`/users/search?fullName=${fullName}&take=${take}&page=${page}`)
    //     return data
    // },
})
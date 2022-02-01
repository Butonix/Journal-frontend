import axios, {AxiosInstance} from "axios";
import Cookies, {parseCookies} from 'nookies';
import {GetServerSidePropsContext, NextPageContext} from "next";
import {
    ArticleResponse, CommentResponse,
    CreateArticleDto,
    CreateCommentDto,
    CreateUserDto,
    LoginUserDto,
    LoginUserResponse
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
        comment: CommentsService(instance)
    }
}


export const AuthService = (instance: AxiosInstance) => ({
    async registration(dto: CreateUserDto) {
        const {data} = await instance.post('auth/registration', dto)
        return data
    },

    async login(dto: LoginUserDto): Promise<LoginUserResponse> {
        const {data} = await instance.post('auth/login', dto)
        return data
    },

    async getMe(): Promise<LoginUserResponse> {
        const {data} = await instance.get('users/me')
        return data
    },
})

export const ArticleService = (instance: AxiosInstance) => ({
    async getArticles() {
        const {data} = await instance.get<ArticleResponse>('articles')
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
})

export const CommentsService = (instance: AxiosInstance) => ({
    async createComment(comment) {
        const {data} = await instance.post<CreateCommentDto, { data: CommentResponse }>('comments', comment)
        return data
    },
    async getComments(articleId?) {
        const {data} = await instance.get<number, { data: Array<CommentResponse> }>(articleId? `comments?articleId=${articleId}` : `comments`)
        return data
    },
    async removeComment(commentId) {
        const {data} = await instance.delete<number, { data: Array<CommentResponse> }>(`comments/${commentId}`)
        return data
    },
})
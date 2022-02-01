import {OutputData} from "@editorjs/editorjs";

export interface CreateUserDto {
    fullName: string
    email: string
    password: string
}

export interface CreateArticleDto {
    title: string
    body: OutputData['blocks']
    tags?: Array<string>
}

export interface LoginUserDto {
    email: string
    password: string
}

export interface LoginUserResponse {
    access_token: string
    email: string
    followers: Array<number> | []
    fullName: string
    id: number
}

export interface ArticleResponse {
    description: string
    title: string
    body: OutputData['blocks']
    tags?: Array<string> | null
    id: number
    views: number
    updatedAt: string
    createdAt: string
    user: LoginUserResponse
}

export interface CreateCommentDto {
    articleId: number
    text: string
}

export interface CommentResponse {
    id: number
    text: string
    article: ArticleResponse
    user: LoginUserResponse
    createdAt: string
    updatedAt: string
}

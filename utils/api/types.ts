export interface CreateUserDto {
    fullName: string
    email: string
    password: string
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

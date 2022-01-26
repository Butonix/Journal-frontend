import axios from "axios";
import {CreateUserDto, LoginUserDto, LoginUserResponse} from "./types";

const instance = axios.create({
    baseURL: 'http://localhost:7070'
})

export class AuthService {
    public static async registration(dto: CreateUserDto) {
        const {data} = await instance.post('auth/registration', dto)
        return data
    }

    public static async login(dto: LoginUserDto): Promise<LoginUserResponse> {
        const {data} = await instance.post('auth/login', dto)
        return data
    }
}
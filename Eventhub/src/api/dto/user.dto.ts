import { Role } from "@prisma/client"

export interface CreateUserInputs {
    username: string,
    email: string,
    password: string
}

export interface LoginInputs {
    email: string,
    password: string
}

export interface RegisterInputs {
    username: string,
    email: string,
    password: string
}

export interface UserPayload {
    id: string,
    username: string,
    email: string,
    otpEnable: boolean,
    role: Role
}
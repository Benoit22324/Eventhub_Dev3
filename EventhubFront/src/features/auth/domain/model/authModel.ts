export type Role = "user" | "admin"

export type LoginForm = {
    email: string,
    password: string
}

export type RegisterForm = {
    username: string,
    email: string,
    password: string
}

export type User = {
    id: string,
    username: string,
    email: string,
    otpEnable: boolean,
    role: Role
}
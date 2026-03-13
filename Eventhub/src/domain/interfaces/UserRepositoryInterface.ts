import { User } from "@prisma/client";

export interface UserRepositoryInterface {
    login(email: string): Promise<User>
    register(username: string, email: string, password: string): Promise<boolean>
    get(id: string): Promise<User>
    findByEmail(email: string): Promise<User | null>
    otpUpdate(id: string, otpEnable: boolean, otpSecret: string): Promise<User>
}
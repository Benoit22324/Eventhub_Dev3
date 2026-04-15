import { User } from "@prisma/client";
import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";

class InMemoryUserRepository implements UserRepositoryInterface {
    async login(email: string): Promise<User> {
        const user = email === "test@gmail.com" ? {
            id: "abc",
            username: "test",
            email: "test@gmail.com",
            password: "johndoe",
            role: "user",
            otpSecret: "",
            otpEnable: false,
            salt: "salty"
        } : null

        if (!user) throw new Error("Identifiant invalide");

        return user as User
    }

    async register(username: string, email: string, password: string): Promise<boolean> {
        const user = email === "test@gmail.com"

        if (!user) {
            return true
        }

        return false
    }

    async get(id: string): Promise<User> {
        const user =  id === "abc" ? {
            id: "abc",
            username: "test",
            email: "test@gmail.com",
            password: "johndoe",
            role: "user",
            otpSecret: "",
            otpEnable: false,
            salt: "salty"
        } : null

        if (!user) throw new Error("Utilisateur introuvable");

        return user as User
    }

    async findByEmail(email: string): Promise<User | null> {
        const user =  email === "test@gmail.com" ? {
            id: "abc",
            username: "test",
            email: "test@gmail.com",
            password: "johndoe",
            role: "user",
            otpSecret: "",
            otpEnable: false,
            salt: "salty"
        } : null

        return user as User
    }

    async otpUpdate(id: string, otpEnable: boolean, otpSecret: string): Promise<User> {
        const user = id === "abc" ? {
            id: "abc",
            username: "test",
            email: "test@gmail.com",
            password: "johndoe",
            role: "user",
            otpSecret: "TopSecretOtp",
            otpEnable: true,
            salt: "salty"
        } : null

        return user as User
    }
}

export default InMemoryUserRepository;
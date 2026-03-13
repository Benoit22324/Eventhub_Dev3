import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";
import { prisma } from "../../api/config/client";
import { User } from "@prisma/client";
import { generateSalt, hashPassword } from "../../api/utility";

class UserRepository implements UserRepositoryInterface {
    async login(email: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if (!user) throw new Error("Identifiant invalide");

        return user
    }

    async register(username: string, email: string, password: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if (!user) {
            const salt = await generateSalt();
            const hashedPassword = await hashPassword(password, salt);

            await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    salt
                }
            });

            return true
        }

        return false
    }

    async get(id: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {id}
        });

        if (!user) throw new Error("Utilisateur introuvable");

        return user
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {email}
        });

        return user
    }

    async otpUpdate(id: string, otpEnable: boolean, otpSecret: string): Promise<User> {
        const user = await prisma.user.update({
            where: {id: id},
            data: {
                otpEnable,
                otpSecret
            }
        });

        return user
    }
}

export default UserRepository;
import { User } from "@prisma/client";
import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";

class GetUserByIdUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(id: string): Promise<User> {
        if (!id) throw new Error("Accès non autorisé");

        try {
            const user = await this.userRepository.get(id);

            return user;
        } catch(err) {
            throw new Error("Identifiants invalide");
        }
    }
}

export default GetUserByIdUseCase;
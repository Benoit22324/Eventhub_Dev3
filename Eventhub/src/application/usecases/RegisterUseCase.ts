import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";

class RegisterUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(username: string, email: string, password: string): Promise<boolean> {
        if (!username) throw new Error("Le nom d'utilisateur est requis");
        if (!email) throw new Error("L'email est requis");
        if (!password) throw new Error("Le mot de passe est requis");

        const user = await this.userRepository.findByEmail(email);

        if (user) throw new Error("L'email est déjà utilisé");

        try {
            const result = await this.userRepository.register(username, email, password);

            return result
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RegisterUseCase;
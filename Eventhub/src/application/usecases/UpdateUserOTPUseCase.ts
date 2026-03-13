import { User } from "@prisma/client";
import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";

class UpdateUserOTPUseCase {
    constructor(private userRepository: UserRepositoryInterface) { }

    async execute(id: string, otpEnable: boolean, otpSecret: string): Promise<User> {
        try {
            const user = await this.userRepository.otpUpdate(id, otpEnable, otpSecret);

            return user
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default UpdateUserOTPUseCase;
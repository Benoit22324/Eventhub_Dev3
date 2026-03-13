import { BackupCodeRepositoryInterface } from "../../domain/interfaces/BackupCodeRepositoryInterface";

class DeleteBCByUserUseCase {
    constructor(private backupCodeRepository: BackupCodeRepositoryInterface) { }

    async execute(userId: string): Promise<void> {
        try {
            await this.backupCodeRepository.deleteByUserId(userId);
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default DeleteBCByUserUseCase;
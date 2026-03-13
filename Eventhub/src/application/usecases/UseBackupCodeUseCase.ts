import { BackupCodeRepositoryInterface } from "../../domain/interfaces/BackupCodeRepositoryInterface";

class UseBackupCodeUseCase {
    constructor(private backupCodeRepository: BackupCodeRepositoryInterface) { }

    async execute(code: string, userId: string, salt: string): Promise<boolean> {
        try {
            const valid = await this.backupCodeRepository.use(code, userId, salt);

            return valid
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default UseBackupCodeUseCase;
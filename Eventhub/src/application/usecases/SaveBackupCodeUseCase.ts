import { OTPBackupCode } from "@prisma/client";
import { BackupCodeRepositoryInterface } from "../../domain/interfaces/BackupCodeRepositoryInterface";

class SaveBackupCodeUseCase {
    constructor(private backupCodeRepository: BackupCodeRepositoryInterface) { }

    async execute(code: string, userId: string, salt: string): Promise<OTPBackupCode> {
        try {
            const backupcode = await this.backupCodeRepository.save(code, userId, salt);

            return backupcode
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default SaveBackupCodeUseCase;
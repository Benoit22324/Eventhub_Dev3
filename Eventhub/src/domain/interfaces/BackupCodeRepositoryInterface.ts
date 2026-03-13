import { OTPBackupCode } from "@prisma/client";

export interface BackupCodeRepositoryInterface {
    save(code: string, userId: string, salt: string): Promise<OTPBackupCode>
    use(code: string, userId: string, salt: string): Promise<boolean>
    deleteByUserId(userId: string): Promise<void>
}
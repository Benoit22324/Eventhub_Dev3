import { OTPBackupCode } from "@prisma/client";
import { prisma } from "../../api/config/client";
import { BackupCodeRepositoryInterface } from "../../domain/interfaces/BackupCodeRepositoryInterface";
import { hashPassword, isValidPassword } from "../../api/utility";

class BackupCodeRepository implements BackupCodeRepositoryInterface {
    async save(code: string, userId: string, salt: string): Promise<OTPBackupCode> {
        const hashedcode = await hashPassword(code, salt);

        const backupcode = await prisma.oTPBackupCode.create({
            data: {
                userId,
                code: hashedcode
            }
        });

        return backupcode
    }

    async use(code: string, userId: string, salt: string): Promise<boolean> {
        const backupCodes = await prisma.oTPBackupCode.findMany({
            where: {userId}
        });

        if (!backupCodes) throw new Error("L'utilisateur n'a pas de code de secours");

        const backupCodePromises = backupCodes.map(async bcode => {
            const rightOne = await isValidPassword(code, bcode.code, salt);

            if (rightOne) return bcode
        });

        const backupCodesResult = await Promise.all(backupCodePromises).then(codes => codes.filter(code => code !== undefined));
        const backupCode = backupCodesResult[0];

        if (backupCode) {
            await prisma.oTPBackupCode.delete({
                where: {id: backupCode.id, userId}
            });

            return true
        }

        return false
    }

    async deleteByUserId(userId: string): Promise<void> {
        await prisma.oTPBackupCode.deleteMany({
            where: {userId}
        });
    }
}

export default BackupCodeRepository;
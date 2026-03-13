import type { Request, Response, NextFunction } from 'express';
import { generateSecret, verify } from 'otplib';
import { generateQrCode, generateSignature, sanitizeUser } from '../utility';
import UpdateUserOTPUseCase from '../../application/usecases/UpdateUserOTPUseCase';
import GetUserByIdUseCase from '../../application/usecases/GetUserByIdUseCase';
import SaveBackupCodeUseCase from '../../application/usecases/SaveBackupCodeUseCase';
import { v4 } from 'uuid';
import DeleteBCByUserUseCase from '../../application/usecases/DeleteBCByUserUseCase';
import UseBackupCodeUseCase from '../../application/usecases/UseBackupCodeUseCase';

class A2FController {
    constructor(
        private getUserByIdUseCase: GetUserByIdUseCase,
        private updateUserOTPUseCase: UpdateUserOTPUseCase,
        private saveBackupCodeUseCase: SaveBackupCodeUseCase,
        private deleteBCByUserUseCase: DeleteBCByUserUseCase,
        private useBackupCodeUseCase: UseBackupCodeUseCase
    ) { }

    async generate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Unauthorized access", 403);

            const { email } = req.user;

            const secret = generateSecret();
            const qrCode = await generateQrCode(email, secret);

            res.jsonSuccess({ qrCode, secret });
        } catch(error) {
            next(error);
        }
    }

    async verify(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Unauthorized access", 403);

            const { token, secret } = req.body;
            const userData = await this.getUserByIdUseCase.execute(req.user.id);

            if (secret) {
                const result = await verify({ secret, token });

                if (!result.valid) return res.jsonError("Invalid code", 400);
            } else if (userData.otpSecret) {
                const result = await verify({ secret: userData.otpSecret, token });

                if (!result.valid) return res.jsonError("Invalid code", 400);
            }

            if (!req.user.otpEnable) {
                const user = await this.updateUserOTPUseCase.execute(req.user.id, true, secret);

                const jwtToken = generateSignature(sanitizeUser(user));
                const currentDate = new Date();
                const expiration = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 2}`);

                res.cookie("jwt", jwtToken, {
                    httpOnly: true,
                    secure: true,
                    expires: expiration
                })

                const backupCodes: string[] = [];

                for(let i = 0; i < 10; i ++) {
                    const code = v4();
                    await this.saveBackupCodeUseCase.execute(code, user.id, user.salt);

                    backupCodes.push(code);
                }

                return res.jsonSuccess(backupCodes);
            }

            res.jsonSuccess(null);
        } catch(error) {
            next(error);
        }
    }

    async useBackup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Unauthorized access", 403);

            const { code } = req.body;
            const userData = await this.getUserByIdUseCase.execute(req.user.id);

            if (req.user.otpEnable) {
                const valid = await this.useBackupCodeUseCase.execute(code, userData.id, userData.salt);

                if (!valid) return res.jsonError("Invalid code");

                res.jsonSuccess(null);
            }
        } catch(error) {
            next(error);
        }
    }

    async disable(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Unauthorized access", 403);

            const user = await this.updateUserOTPUseCase.execute(req.user.id, false, "");
            await this.deleteBCByUserUseCase.execute(user.id);

            const token = generateSignature(sanitizeUser(user));
            const currentDate = new Date();
            const expiration = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 2}`);

            res.cookie("jwt", token, {
                httpOnly: true,
                secure: true,
                expires: expiration
            });

            res.jsonSuccess(null);
        } catch(error) {
            next(error);
        }
    }
}

export default A2FController;
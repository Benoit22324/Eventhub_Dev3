import type { Request, Response, NextFunction } from 'express';
import { LoginInputs, RegisterInputs } from '../dto/user.dto';
import LoginUseCase from '../../application/usecases/LoginUseCase';
import { generateSignature } from '../utility';
import RegisterUseCase from '../../application/usecases/RegisterUseCase';

class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registerUseCase: RegisterUseCase
    ) { }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body as LoginInputs;

            const user = await this.loginUseCase.execute(email, password);

            const token = generateSignature(user);
            const currentDate = new Date();
            const expiration = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() + 2}`);

            res.cookie("jwt", token, {
                httpOnly: true,
                secure: true,
                expires: expiration
            })

            return res.jsonSuccess(user);
        } catch(error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, email, password } = req.body as RegisterInputs;

            const result = await this.registerUseCase.execute(username, email, password);

            if (!result) return res.jsonError("An error as occured");

            return res.jsonSuccess(null, 201);
        } catch(error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Unauthorized access", 403);

            res.cookie("jwt", "", {
                expires: new Date("2000-01-01"),
                httpOnly: true,
                secure: true
            });

            return res.jsonSuccess(null);
        } catch(error) {
            next(error);
        }
    }

    async me(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("You're not Authenticated", 401);

            const { id, username, email, otpEnable, role } = req.user;

            return res.jsonSuccess({ id, username, email, otpEnable, role });
        } catch(error) {
            next(error);
        }
    }
}

export default AuthController;
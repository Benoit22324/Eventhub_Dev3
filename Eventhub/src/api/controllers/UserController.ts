import type { Request, Response, NextFunction } from 'express';
import GetUserByIdUseCase from '../../application/usecases/GetUserByIdUseCase';
import { sanitizeUser } from '../utility';
import { v4 } from 'uuid';

class UserController {
    constructor(
        private getUserByIdUseCase: GetUserByIdUseCase
    ) { }

    async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Unauthorized access", 403);

            const user = await this.getUserByIdUseCase.execute(req.user.id);

            res.jsonSuccess(sanitizeUser(user));
        } catch(error) {
            next(error);
        }
    }
}

export default UserController;
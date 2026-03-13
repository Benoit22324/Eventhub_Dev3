import type { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { extractToken, getEnvVariable } from '../utility';
import { UserPayload } from '../dto/user.dto';

declare module "express-serve-static-core" {
    interface Request {
        user?: UserPayload
    }
}

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cookies = req.cookies;

        if (!cookies) return res.jsonError("Missing authorization cookie", 403);

        const token = extractToken(cookies);

        if (!token) return res.jsonError("Invalid authorization cookie", 403);

        const payload = jwt.verify(token, getEnvVariable("JWT_SECRET")) as UserPayload;

        req.user = payload;

        next();
    } catch(error) {
        next(error);
    }
}
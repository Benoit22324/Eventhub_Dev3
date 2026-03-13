import type { Request, Response, NextFunction } from 'express';
import { Role } from "@prisma/client";

export const authorizeRolesMiddleware = (...allowedRoles: Role[]) =>
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        if (!req.user) return res.jsonError("Unauthorized", 403);

        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) return res.jsonError("Unauthorized", 403);

        next();
    }
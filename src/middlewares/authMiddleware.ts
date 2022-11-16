import { userRepository } from './../repositories/UserRepository';
import { UnauthorizedError } from './../helpers/api-errors';
import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

type JwtPayload = {
    id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new UnauthorizedError("Não autorizado");
    }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

    const user = await userRepository.findOneBy({ id });

    if (!user) {
        throw new UnauthorizedError("Não autorizado");
    }

    const { password: _, ...loggedUser } = user;

    req.user = loggedUser

    next();
}
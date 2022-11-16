import { BadRequestError, NotFoundError, UnauthorizedError } from './../helpers/api-errors';
import { userRepository } from './../repositories/UserRepository';
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const userExist = await userRepository.findOneBy({ email });

        if (userExist) {
            throw new BadRequestError("Email já existe");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({ name, email, password: hashPassword })

        await userRepository.save(newUser);

        const { password: _, ...user } = newUser;

        return res.status(201).json(user);
    }

    // Melhor colocar a parte de login em um controller próprio
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await userRepository.findOneBy({ email });

        if (!user) {
            throw new NotFoundError("Email ou senha inválidos");
        }

        const verifyPass = await bcrypt.compare(password, user.password);

        if (!verifyPass) {
            throw new NotFoundError("Email ou senha inválidos");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '8h' });

        const { password: _, ...userLogin } = user;

        return res.status(201).json({
            user: userLogin,
            token: token
        });
    }

    async getProfile(req: Request, res: Response) {
        return res.json(req.user);
    }
}
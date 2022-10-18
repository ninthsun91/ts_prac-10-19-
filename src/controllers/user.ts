import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import Users from '../database/models/user';
import env from '../config.env';


interface UserI {
    userId?: number;
    username: string;
    password: string;
    confirm?: string;
}

interface PayloadI {
    [key: string]: string | number;
    userId: number;
    username: string;
}


export default {
    signup: async function(req: Request, res: Response, next: NextFunction) {
        const { username, password, confirm }: UserI = req.body;

        try {
            const passHash = await bcrypt.hash(password, 10);
            const result = await Users.create({ username, password: passHash });
            console.log(result);

            res.cookie('userId', result.get().userId);
            res.statusCode = 200;
            res.json({
                message: "SUCCESS"
            });
        } catch (error: any) {
            console.error(error);
            next(error);
        }
    },
    signin: async function(req: Request, res: Response, next: NextFunction) {
        const { username, password }: UserI = req.body;

        try {
            const result = await Users.findOne({
                where: { username }
            });

            if (result === null) {
                res.statusCode = 400;
                throw new Error("아이디, 비밀번호가 잘못되었습니다.");
            }

            const user = result.get();
            const passCheck = await bcrypt.compare(password, user.password);
            if (!passCheck) {
                res.statusCode = 400;
                throw new Error("비밀번호가 잘못되었습니다.");
            }

            const payload: PayloadI = {
                userId: user.userId,
                username: user.username
            };
            const accesstoken = jwt.sign(payload, env.JWT_KEY, {
                algorithm: 'HS256',
                expiresIn: 60*10
            });
            const refreshToken = jwt.sign({}, env.JWT_KEY, {
                algorithm: 'HS256',
                expiresIn: 60*60*24
            });

            res.cookie('Authorization', 'Bearer ' + accesstoken);
            req.session.refreshToken = user.userId + '=' + refreshToken;
            res.statusCode = 200;
            res.json({
                message: 'SUCCESS'
            });
        } catch(error: any) {
            console.error(error);
            next(error);
        }
    }
}
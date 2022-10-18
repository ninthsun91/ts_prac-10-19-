import { Request, Response, NextFunction } from 'express';
import Posts from '../database/models/post';
import Users from '../database/models/user';
import jwt from 'jsonwebtoken';
import env from '../config.env'


interface PostI {
    postId?: number;
    userId: number;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default {
    createPost: async function(req: Request, res: Response, next: NextFunction) {

        // const { Authorization } = req.headers;
        // const { refreshToken: refreshSession } = req.session;

        // if (typeof Authorization !== 'string' || typeof refreshSession !== 'string') {
        //     res.statusCode = 401;
        //     throw new Error('UNAUTHORIZED');
        // }
        // const [tokenType, accessToken] = Authorization.split(' ')

        const { userId } = req.cookies;
        const { title, content }: PostI = req.body;

        try {
            const post: PostI = { userId, title, content };
            const result = await Posts.create(post);

            res.statusCode = 200;
            res.json({
                message: 'SUCCESS'
            });
            
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
    findPosts: async function(req: Request, res: Response, next: NextFunction) {
        const postList = await Posts.findAll({
            include: Users
        });

        res.statusCode = 200;
        res.json({
            postList
        });
    },
    findPost: async function(req: Request, res: Response, next: NextFunction) {
        const { postId } = req.params;
        const post = await Posts.findByPk(postId, {
            include: {
                model: Users,
                attributes: {
                    exclude: ["password"]
                }
            }
        });

        if (!post) throw new Error("게시글을 찾을 수 없습니다.");

        res.statusCode = 200;
        res.json({
            post
        });
    },
}
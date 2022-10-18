import { Router } from 'express';
import Post from '../controllers/post';


const router = Router();

router.route('/')
    .post(Post.createPost)
    .get(Post.findPosts);

router.route('/:postId')
    .get(Post.findPost);


export default router;
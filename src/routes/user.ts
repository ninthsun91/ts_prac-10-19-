import { Router } from 'express';
import User from '../controllers/user';


const router = Router();


router.route('/signup')
    .post(User.signup);

router.route('/signin')
    .post(User.signin);


export default router;
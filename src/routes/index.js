import { Router } from 'express';

import AuthenticationRouter from './AuthRouter.js';
import PostsRouter from './PostsRouter.js';
import { ValidateUserToken } from '../middlewares/Authentication.js';

const router = Router();

router.use(AuthenticationRouter);
router.use(PostsRouter);

export default router;

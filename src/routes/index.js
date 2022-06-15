import { Router } from 'express';

import PostsRouter from './PostsRouter.js';
import AuthenticationRouter from './Authentication.js';
import UserRouter from './UsersRouter.js';

import { ValidateUserToken } from '../middlewares/Authentication.js';
import HashtagsRouter from './Hashtags.js';

const router = Router();

router.use(AuthenticationRouter);
router.use(ValidateUserToken, HashtagsRouter);
router.use(PostsRouter);
router.use(UserRouter);

export default router;

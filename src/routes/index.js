import { Router } from 'express';
import cors from 'cors';

import PostsRouter from './PostsRouter.js';
import AuthenticationRouter from './Authentication.js';
import UserRouter from './UsersRouter.js';
import LikesRouter from './Likes.js';

import { ValidateUserToken } from '../middlewares/Authentication.js';
import HashtagsRouter from './Hashtags.js';
import SearchRouter from './SearchBar.js';

const router = Router();

router.use(AuthenticationRouter);
router.use(ValidateUserToken, HashtagsRouter);
router.use(PostsRouter);
router.use(UserRouter);
router.use(SearchRouter);
router.use(ValidateUserToken, LikesRouter);
router.use(cors());

export default router;

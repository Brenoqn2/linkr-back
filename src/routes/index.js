import { Router } from 'express';

import AuthenticationRouter from './Authentication.js';
import { ValidateUserToken } from '../middlewares/Authentication.js';
import HashtagsRouter from './Hashtags.js';

const router = Router();

router.use(AuthenticationRouter);
router.use(ValidateUserToken, HashtagsRouter);

export default router;

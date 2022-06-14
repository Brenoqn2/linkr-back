import { Router } from 'express';

import AuthenticationRouter from './AuthRouter.js';
import { ValidateUserToken } from '../middlewares/Authentication.js';

const router = Router();

router.use(AuthenticationRouter);

export default router;

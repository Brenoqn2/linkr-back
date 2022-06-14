import { Router } from 'express';

import { PostSignupController, PostSigninController } from '../controllers/Authentication.js';
import { PostSignupMiddleware, PostSigninMiddleware } from '../middlewares/Authentication.js';

const AuthenticationRouter = Router();

AuthenticationRouter.post('/signup', PostSignupMiddleware, PostSignupController);
AuthenticationRouter.post('/signin', PostSigninMiddleware, PostSigninController);

export default AuthenticationRouter;
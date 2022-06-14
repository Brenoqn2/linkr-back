import { Router } from 'express';

import {
  PostSignupController,
  PostSigninController,
} from '../controllers/AuthController.js';
import {
  PostSignupMiddleware,
  PostSigninMiddleware,
} from '../middlewares/Authentication.js';

const AuthenticationRouter = Router();

AuthenticationRouter.post(
  '/signup',
  PostSignupMiddleware,
  PostSignupController
);
AuthenticationRouter.post(
  '/signin',
  PostSigninMiddleware,
  PostSigninController
);

export default AuthenticationRouter;

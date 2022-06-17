import { Router } from 'express';

import {
  PostSignupController,
  PostSigninController,
  LogoutUserController
} from '../controllers/Authentication.js';
import {
  PostSignupMiddleware,
  PostSigninMiddleware
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

AuthenticationRouter.post(
  '/logout',
  LogoutUserController
);

export default AuthenticationRouter;

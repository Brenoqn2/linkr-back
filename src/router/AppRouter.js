import { Router } from 'express';

import AuthenticationRouter from '../routes/Authentication.js';

const AppRouter = Router();

AppRouter.use(AuthenticationRouter);

export default AppRouter;
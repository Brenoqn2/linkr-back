import { Router } from 'express';

import { getUserData } from '../controllers/UsersController.js';

const UserRouter = Router();

UserRouter.get('/user', getUserData);

export default UserRouter;

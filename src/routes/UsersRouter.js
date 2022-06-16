import { Router } from 'express';

import { getUserData } from '../controllers/UsersController.js';
import { ValidateUserToken } from '../middlewares/Authentication.js';
import { ChangeUserAvatarController } from '../controllers/UsersController.js';

const UserRouter = Router();

UserRouter.get('/user', getUserData);
UserRouter.put('/change/avatar', ValidateUserToken, ChangeUserAvatarController);

export default UserRouter;
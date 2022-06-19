import { Router } from 'express';

import {
  getUserData,
  getUserPosts,
  getUsers,
  ChangeUserAvatarController,
} from '../controllers/UsersController.js';
import { ValidateUserToken } from '../middlewares/Authentication.js';

const UserRouter = Router();

UserRouter.get('/user', getUserData);
UserRouter.get('/users', getUsers);
UserRouter.get('/users/:id', getUserPosts);
UserRouter.put('/change/avatar', ValidateUserToken, ChangeUserAvatarController);

export default UserRouter;

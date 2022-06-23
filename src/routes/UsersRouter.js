import { Router } from 'express';

import {
  getUserData,
  getUserPosts,
  getUsers,
  ChangeUserAvatarController,
  checkMorePosts,
} from '../controllers/UsersController.js';
import { ValidateUserToken } from '../middlewares/Authentication.js';

const UserRouter = Router();

UserRouter.get('/user', getUserData);
UserRouter.get('/users', getUsers);
UserRouter.get('/users/:id', getUserPosts);
UserRouter.put('/change/avatar', ValidateUserToken, ChangeUserAvatarController);
UserRouter.get('/users/checkPosts/:id', checkMorePosts);

export default UserRouter;

import { Router } from 'express';

import {
    FollowUserController,
    UnFollowUserController,
    GetUserFollowersController
} from '../controllers/Follow.js';

const FollowRouter = Router();

FollowRouter.post('/follow/:followingId', FollowUserController);
FollowRouter.post('/unfollow/:followingId', UnFollowUserController);
FollowRouter.get('/followers/:userId', GetUserFollowersController);

export default FollowRouter;
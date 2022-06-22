import { Router } from 'express';

import {
  LikePostController,
  UnlikePostController,
  GetLikesController,
} from '../controllers/Likes.js';

const LikesRouter = Router();

LikesRouter.post('/like/:postId', LikePostController);
LikesRouter.post('/unlike/:postId', UnlikePostController);
LikesRouter.get('/likes/:postId', GetLikesController);

export default LikesRouter;

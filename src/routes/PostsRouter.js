import { Router } from 'express';

import { getPosts } from '../controllers/PostsController';

const PostsRouter = Router();

PostsRouter.get('/posts', getPosts);

export default PostsRouter;

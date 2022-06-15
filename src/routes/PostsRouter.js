import { Router } from 'express';

import { getPosts, getMetadata } from '../controllers/PostsController.js';

const PostsRouter = Router();

PostsRouter.get('/posts', getPosts);
PostsRouter.get('/posts/:id/metadata', getMetadata);

export default PostsRouter;

import { Router } from 'express';

import { getPosts, createPost } from '../controllers/PostsController.js';

const PostsRouter = Router();

PostsRouter.get('/posts', getPosts);
PostsRouter.post('/post', createPost);

export default PostsRouter;

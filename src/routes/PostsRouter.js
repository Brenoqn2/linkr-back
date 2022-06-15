import { Router } from 'express';

import {
  getPosts,
  getMetadata,
  createPost,
} from '../controllers/PostsController.js';
import validateSchema from '../middlewares/schemaValidator.js';
import { postSchema } from '../schemas/post.js';

const PostsRouter = Router();

PostsRouter.get('/posts', getPosts);
PostsRouter.get('/posts/:id/metadata', getMetadata);
PostsRouter.post('/post', validateSchema(postSchema), createPost);

export default PostsRouter;

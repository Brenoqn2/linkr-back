import { Router } from 'express';

import { getPosts, createPost } from '../controllers/PostsController.js';
import validateSchema from '../middlewares/schemaValidator.js';
import { postSchema } from '../schemas/post.js';

const PostsRouter = Router();

PostsRouter.get('/posts', getPosts);
PostsRouter.post('/post', validateSchema(postSchema), createPost);

export default PostsRouter;

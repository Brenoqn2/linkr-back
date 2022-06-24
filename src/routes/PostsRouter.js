import { Router } from 'express';

import {
  getPosts,
  getMetadata,
  createPost,
  deletePost,
  editPost,
  getComments,
  createComment,
  createRepost,
  countReposts,
  checkMorePosts,
  checkNewPosts,
} from '../controllers/PostsController.js';

import { validatePostIdUserId } from '../middlewares/Authentication.js';
import validateSchema from '../middlewares/schemaValidator.js';
// import { checkUserExists } from '../middlewares/UserValidator.js';

import { postSchema } from '../schemas/post.js';

const PostsRouter = Router();

PostsRouter.get('/posts', getPosts);
PostsRouter.get('/posts/:id/metadata', getMetadata);
PostsRouter.get('/post/:id/comments', getComments);
PostsRouter.post('/post/:id/comments', createComment);
PostsRouter.post('/post', validateSchema(postSchema), createPost);
PostsRouter.delete('/post/:id', validatePostIdUserId, deletePost);
PostsRouter.put(
  '/post/:id',
  validateSchema(postSchema),
  validatePostIdUserId,
  editPost
);
PostsRouter.post('/share/:postId', createRepost);
PostsRouter.get('/reposts/:postId', countReposts);
PostsRouter.get('/checkPosts', checkMorePosts);
PostsRouter.get('/checkNewPosts/:id', checkNewPosts);

export default PostsRouter;

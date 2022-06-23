import { Router } from 'express';
import {
  getTrendingHashtags,
  getHashtagPosts,
  createHashtag,
  checkMorePosts,
} from '../controllers/Hashtags.js';

const HashtagsRouter = Router();
HashtagsRouter.get('/trending', getTrendingHashtags);
HashtagsRouter.get('/hashtag/:hashtag', getHashtagPosts);
HashtagsRouter.post('/hashtag', createHashtag);
HashtagsRouter.get('/checkPosts/:hashtag', checkMorePosts);

export default HashtagsRouter;

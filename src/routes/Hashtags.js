import { Router } from 'express';
import {
  getTrendingHashtags,
  getHashtagPosts,
  createHashtag,
} from '../controllers/Hashtags.js';

const HashtagsRouter = Router();
HashtagsRouter.get('/trending', getTrendingHashtags);
HashtagsRouter.get('/hashtag/:hashtag', getHashtagPosts);
HashtagsRouter.post('/hashtag', createHashtag);

export default HashtagsRouter;

import { Router } from 'express';
import {
  getTrendingHashtags,
  getHashtagPosts,
} from '../controllers/Hashtags.js';

const HashtagsRouter = Router();
HashtagsRouter.get('/trending', getTrendingHashtags);
HashtagsRouter.get('/hashtag/:hashtag', getHashtagPosts);

export default HashtagsRouter;

import { Router } from 'express';
import { getTrendingHashtags } from '../controllers/Hashtags.js';

const HashtagsRouter = Router();
HashtagsRouter.get('/trending', getTrendingHashtags);

export default HashtagsRouter;

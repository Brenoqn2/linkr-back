import { Router } from 'express';
import { searchUsers } from '../controllers/SearchBar.js';

const SearchRouter = Router();
SearchRouter.use('/search', searchUsers);

export default SearchRouter;

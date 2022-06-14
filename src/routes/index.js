import { Router } from 'express';

import AuthenticationRouter from './AuthRouter.js';
import { ValidateUserToken } from '../middlewares/Authentication.js';
import HashtagsRouter from '../routes/Hashtags.js';

const router = Router();

// aqui não podemos usar o ValidateUserToken ( pq o usuário precisa registrar e logar )
router.use(AuthenticationRouter);

// a partir daqui já temos um middleware que vai validar se o token é válido
// podemos usar esse middleware para todas as rotas que precisam de autenticação
// como por exemplo:
<<<<<<< HEAD:src/router/AppRouter.js
//AppRouter.use(PostsRouter, ValidateUserToken);
//AppRouter.use(CommentsRouter, ValidateUserToken);
//etc
AppRouter.use(ValidateUserToken, HashtagsRouter);

export default AppRouter;
=======

// router.use(PostsRouter, ValidateUserToken);
// router.use(CommentsRouter, ValidateUserToken);
// etc

export default router;
>>>>>>> main:src/routes/index.js

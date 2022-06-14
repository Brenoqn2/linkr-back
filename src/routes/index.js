import { Router } from 'express';

import AuthenticationRouter from './AuthRouter.js';
import { ValidateUserToken } from '../middlewares/Authentication.js';

const router = Router();

// aqui não podemos usar o ValidateUserToken ( pq o usuário precisa registrar e logar )
router.use(AuthenticationRouter);

// a partir daqui já temos um middleware que vai validar se o token é válido
// podemos usar esse middleware para todas as rotas que precisam de autenticação
// como por exemplo:

// router.use(PostsRouter, ValidateUserToken);
// router.use(CommentsRouter, ValidateUserToken);
// etc

export default router;

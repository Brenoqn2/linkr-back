import { Router } from 'express';

import AuthenticationRouter from '../routes/Authentication.js';
import { ValidateUserToken } from '../middlewares/Authentication.js';

const AppRouter = Router();

// aqui não podemos usar o ValidateUserToken ( pq o usuário precisa registrar e logar )
AppRouter.use(AuthenticationRouter);

// a partir daqui já temos um middleware que vai validar se o token é válido
// podemos usar esse middleware para todas as rotas que precisam de autenticação
// como por exemplo:

//AppRouter.use(PostsRouter, ValidateUserToken);
//AppRouter.use(CommentsRouter, ValidateUserToken);
//etc

export default AppRouter;
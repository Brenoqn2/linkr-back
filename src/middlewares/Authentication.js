import {
  PostSignupSchema,
  PostSigninSchema,
} from '../schemas/Authentication.js';
import AuthenticationRepository from '../repositories/Authentication.js';
import UserRepository from '../repositories/UserRepository.js';

export async function PostSignupMiddleware(req, res, next) {
  const { error } = PostSignupSchema.validate(req.body, { abortEarly: true });
  if (error)
    return res.status(422).send(error.details.map((detail) => detail.message));
  next();
}

export async function PostSigninMiddleware(req, res, next) {
  const { error } = PostSigninSchema.validate(req.body, { abortEarly: true });
  if (error)
    return res.status(422).send(error.details.map((detail) => detail.message));
  next();
}

export async function ValidateUserToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization ? authorization.replace('Bearer ', '') : null;
  if (!token) return res.status(401).send('token not provided');

  try {
    const ValidateToken = await AuthenticationRepository.GetUserToken(token);
    if (ValidateToken.rowCount === 0)
      return res.status(401).send('invalid token');

    // se a hora atual for maior que a hora de expiração do token, então o token é inválido
    if (new Date().getTime() > ValidateToken.rows[0].expiration) {
      // se o token estiver expirado, então encerra a sessão
      AuthenticationRepository.EndSession(token);
      return res.status(401).send('token expired');

      // observação aqui: quando encerrar a sessão o front deve deslogar o usuário e
      // redirecionar para a página de login
    }

    const expirationTime = 4 * 60 * 60 * 1000; // 4 horas
    const currentTime = new Date().getTime(); // HH:MM:SS em milisegundos
    const expiration = currentTime + expirationTime;

    AuthenticationRepository.UpdateTokenExpiration(token, expiration);
    next();
  } catch (err) {
    return res
      .status(500)
      .send(
        `Error accessing database during Middleware ValidateUserToken.\n${err}`
      );
  }
}

export async function validatePostIdUserId(req, res, next) {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();

  try {
    const resultUser = await UserRepository.getUserByToken(token);
    const { id: userId } = resultUser.rows[0];

    const resultPost = await UserRepository.getUserByPostId(id);
    const { userId: userIdByPost } = resultPost.rows[0];

    if (userId !== userIdByPost)
      return res.status(403).send('This post has other userId');

    next();
  } catch (err) {
    res.status(500).send({
      message:
        'Error accessing database during Middleware validatePostIdUserId',
      error: err,
    });
  }
}

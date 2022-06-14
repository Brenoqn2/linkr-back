import {
  PostSignupSchema,
  PostSigninSchema,
} from '../schemas/Authentication.js';
import AuthenticationRepository from '../repositories/AuthRepository.js';

export async function PostSignupMiddleware(req, res, next) {
  const { error } = PostSignupSchema.validate(req.body, { abortEarly: false });
  if (error)
    return res.status(422).send(error.details.map((detail) => detail.message));
  next();
}

export async function PostSigninMiddleware(req, res, next) {
  const { error } = PostSigninSchema.validate(req.body, { abortEarly: false });
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
    if (Date.now() > ValidateToken.rows[0].expiration)
      return res.status(401).send('token expired');
    next();
  } catch (err) {
    return res
      .status(500)
      .send(
        `Error accessing database during Middleware ValidateUserToken.\n${err}`
      );
  }
}

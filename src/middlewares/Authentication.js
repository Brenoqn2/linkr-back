import { PostSignupSchema, PostSigninSchema } from "../schemas/Authentication.js";

export async function PostSignupMiddleware(req, res, next) {

    const { error } = PostSignupSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));
    next();
}

export async function PostSigninMiddleware(req, res, next) {

    const { error } = PostSigninSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).send((error.details.map(detail => detail.message)));
    next();
}
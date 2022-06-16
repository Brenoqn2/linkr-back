/* eslint-disable prefer-regex-literals */
import joi from 'joi';

export const PostSignupSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
  confirmPassword: joi.ref('password'),
  avatar: joi.string().required()
});

export const PostSigninSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
});

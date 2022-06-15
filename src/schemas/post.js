/* eslint-disable prefer-regex-literals */
import joi from 'joi';

export const postSchema = joi.object({
  content: joi.string(),
  link: joi.string().uri().required(),
});

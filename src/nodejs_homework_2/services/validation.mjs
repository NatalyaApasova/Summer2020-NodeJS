import Joi from 'joi';
import * as expressJoiValidation from 'express-joi-validation';

export const validator = expressJoiValidation.createValidator({
  passError: true,
  statusCode: 400
});

export const postSchema = {
  user: Joi.object().keys({
    login: Joi.string()
      .alphanum()
      .min(2)
      .max(25)
      .required(),
    password: Joi.string()
      .alphanum()
      .min(8)
      .max(25)
      .required(),
    age: Joi.number()
      .min(4)
      .max(130)
      .integer()
      .required(),
    isDeleted: Joi.boolean()
      .required()
  })
};

export const updateSchema = {
  user: Joi.object().keys({
    login: Joi.string()
      .alphanum()
      .min(2)
      .max(25),
    password: Joi.string()
      .alphanum()
      .min(8)
      .max(25),
    age: Joi.number()
      .min(4)
      .max(130)
      .integer(),
    isDeleted: Joi.boolean()
  })
};

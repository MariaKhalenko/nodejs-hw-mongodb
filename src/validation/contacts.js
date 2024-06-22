import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(new RegExp('^[A-Za-z]+$'))
    .messages({
      'string.pattern.base': 'Name must not contain numbers',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name must be at most 20 characters long',
      'any.required': 'Name is required',
    }),
  phoneNumber: Joi.string()
    .min(3)
    .max(20)
    .required()
    .pattern(new RegExp('^[0-9-]+$'))
    .messages({
      'string.pattern.base': 'PhoneNumber must not contain letters',
      'string.min': 'PhoneNumber must be at least 3 characters long',
      'string.max': 'PhoneNumber must be at most 20 characters long',
      'any.required': 'PhoneNumber is required',
    }),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(new RegExp('^[A-Za-z]+$'))
    .messages({
      'string.pattern.base': 'Name must not contain numbers',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name must be at most 20 characters long',
    }),
  phoneNumber: Joi.string()
    .min(3)
    .max(20)
    .pattern(new RegExp('^[0-9-]+$'))
    .messages({
      'string.pattern.base': 'PhoneNumber must not contain letters',
      'string.min': 'PhoneNumber must be at least 3 characters long',
      'string.max': 'PhoneNumber must be at most 20 characters long',
    }),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
}).min(1);

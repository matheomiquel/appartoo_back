import * as Joi from 'joi'
const email = 'matheo@gmail.com'
const password = 'password12'
const LoginSchema = Joi.object({
    email: Joi.string()
        .email()
        .max(256)
        .required()
        .messages({
            'string.base': `"email" should be a type of 'text'`,
            'string.max': `"email" should have a maximum length of {#limit}`,
            'string.email': 'email must be valid',
            'any.required': `"email" is a required field`
        }).example(email),
    password: Joi.string()
        .min(8)
        .max(255)
        .required()
        .messages({
            'string.base': `"password" should be a type of 'text'`,
            'string.min': `"password" should have a minimum length of {#limit}`,
            'string.max': `"password" should have a maximum length of {#limit}`,
            'any.required': `"password" is a required field`
        })
        .example(password),
});

export { LoginSchema };
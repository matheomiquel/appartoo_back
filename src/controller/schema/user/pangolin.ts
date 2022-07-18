import * as Joi from 'joi'
const name = 'Matheo'
const email = 'matheo@gmail.com'

const PangolinResponse = Joi.object({
    id: Joi.number().required().example(1),
    name: Joi.string().required().example(name),
    email: Joi.string().required().email().example(email),
    role: Joi.string().required().example('Sorcerer'),
})

export { PangolinResponse };
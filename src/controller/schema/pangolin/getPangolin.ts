import * as Joi from 'joi'

const GetPangolinSchemaQuery = Joi.object({
    order: Joi.string().valid('ASC', 'DESC').default('ASC').required(),
    limit: Joi.number().default(10).required(),
    offset: Joi.number().positive().allow(0).default(0).required()
}).options({ allowUnknown: true });

export { GetPangolinSchemaQuery };
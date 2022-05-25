import * as Joi from 'joi'
const addFriendSchema = Joi.object({
    friendId: Joi.number()
        .required()
}).options({ allowUnknown: true })
    ;

export { addFriendSchema };
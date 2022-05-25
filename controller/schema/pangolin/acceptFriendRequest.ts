import * as Joi from 'joi'
const acceptFriendRequestSchema = Joi.object({
    friendId: Joi.number()
        .required()
}).options({ allowUnknown: true })
    ;

export { acceptFriendRequestSchema };
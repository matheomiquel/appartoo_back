import { AcceptFriendRequestSchemaBody } from '../../schema'
import { tags } from '../tags'
import { badRequestSchema, notFoundSchema, unauthorizedSchema } from '../error'
import { formattingBody } from '../formatting'
import { endpoint } from './endpoint'
const AcceptFriendRequestSwagger = {
    [`/${endpoint}/acceptFriendRequest`]: {
        post: {
            security: {
                bearerAuth: []
            },
            tags: [tags.pangolin.name],
            description: "Accept a friend request",
            requestBody: formattingBody({ description: "Accept a friend request", schema: AcceptFriendRequestSchemaBody }),
            produces: ["application/json"],
            responses: {
                204: {
                    description: 'request send, no body',
                },
                400: { ...formattingBody({ description: "Error in request body", schema: badRequestSchema }) },
                401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) },
                404: { ...formattingBody({ description: "friend request not found", schema: notFoundSchema }) },
                409: { ...formattingBody({ description: "You are already friend with this person", schema: notFoundSchema }) },
            }
        }
    }
}
export { AcceptFriendRequestSwagger }
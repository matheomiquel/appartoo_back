import { AddFriendSchemaBody } from '../../schema'
import { tags } from '../tags'
import { badRequestSchema, notFoundSchema, unauthorizedSchema } from '../error'
import { formattingBody } from '../formatting'
import { endpoint } from './endpoint'
const parameters = [{ in: 'body', schema: AddFriendSchemaBody }]
const addFriendSwagger = {
    [`/${endpoint}/addFriend`]: {
        post: {
            tags: [tags.pangolin.name],
            description: "Accept a friend request",
            requestBody: formattingBody({ description: "Send a friend request", schema: AddFriendSchemaBody }),
            produces: ["application/json"],
            responses: {
                204: {
                    description: 'request send, no body',
                },
                400: { ...formattingBody({ description: "Error in request body", schema: badRequestSchema }) },
                401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) },
                404: { ...formattingBody({ description: "Pangolin not found", schema: notFoundSchema }) },
                409: { ...formattingBody({ description: "You are already friend with this person", schema: notFoundSchema }) },
            }
        }
    }
}
export { addFriendSwagger }
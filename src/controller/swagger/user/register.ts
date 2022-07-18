import j2s from 'joi-to-swagger';
import { RegisterSchemaBody, RegisterSchemaResponse } from '../../schema'
import { tags } from '../tags'
import { badRequestSchema, conflictSchema, notFoundSchema } from '../error'
import { formattingBody } from '../formatting'
const registerSwagger = {
    '/register': {
        post: {
            tags: [tags.pangolin.name],
            description: "Create new user in system",
            requestBody: formattingBody({ description: "User that we want to create", schema: RegisterSchemaBody }),
            produces: ["application/json"],
            responses: {
                200: {
                    ...formattingBody({ description: "New pangolin is created", schema: RegisterSchemaResponse })
                },
                400: { ...formattingBody({ description: "Error in request body", schema: badRequestSchema }) },
                404: { ...formattingBody({ description: "Role not found", schema: notFoundSchema }) },
                409: { ...formattingBody({ description: "email already taken", schema: conflictSchema }) }
            }
        }
    }
}
export { registerSwagger }
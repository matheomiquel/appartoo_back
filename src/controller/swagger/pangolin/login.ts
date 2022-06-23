import { RegisterSchemaResponse, LoginSchemaBody } from '../../schema'
import { tags } from '../tags'
import { badRequestSchema, notFoundSchema } from '../error'
import { formattingBody } from '../formatting'
const loginSwagger = {
    '/login': {
        post: {
            tags: [tags.pangolin.name],
            description: "Login pangolin",
            requestBody: formattingBody({ description: "Login route", schema: LoginSchemaBody }),
            produces: ["application/json"],
            responses: {
                200: {
                    ...formattingBody({ description: "Pangolin login !!!", schema: RegisterSchemaResponse })
                },
                400: { ...formattingBody({ description: "Error in request body", schema: badRequestSchema }) },
                404: { ...formattingBody({ description: "wrong email or password", schema: notFoundSchema }) },
            }
        }
    }
}
export { loginSwagger }
import { PangolinResponse, GetPangolinSchemaQuery } from '../../schema'
import { tags } from '../tags'
import { unauthorizedSchema } from '../error'
import { formattingBody, formattingParameters } from '../formatting'
import { endpoint } from './endpoint'
const parameters = [{ in: 'query', schema: GetPangolinSchemaQuery }]
const getMeSwagger = {
    [`/${endpoint}/getMe`]: {
        get: {
            tags: [tags.pangolin.name],
            description: "Accept a friend request",
            produces: ["application/json"],
            parameters: formattingParameters({ parameters }),
            responses: {
                200: { ...formattingBody({ description: "return all pangolin", schema: PangolinResponse }) },
                401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) },
            }
        }
    }
}
export { getMeSwagger }
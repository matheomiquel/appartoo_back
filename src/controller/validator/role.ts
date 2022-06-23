import { GetById } from '../schema'
import { Request } from 'express'
import { ValidationError } from 'joi'
import { ControllerError } from '../error'
export class RoleValidator {
    async getById(req: Request) {
        try {
            await GetById.validateAsync(req.params, {
                abortEarly: false
            })
        } catch (e) {
            const errors = e as ValidationError
            throw await ControllerError.badRequest({
                message: errors.details.map((error) => error.message)
            })
        }
    }
}
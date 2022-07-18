import { RegisterSchemaBody, LoginSchemaBody, AddFriendSchemaBody, AcceptFriendRequestSchemaBody, GetPangolinSchemaQuery, TokenHeader } from '../schema'
import { Request } from 'express'
import { ValidationError } from 'joi'
import { ControllerError } from '../error'
import { requestType} from '../routes/type'
export class UserValidator {
    async register(req: requestType) {
        try {
            await RegisterSchemaBody.validateAsync(req.body, {
                abortEarly: false
            })
        } catch (e) {
            const errors = e as ValidationError
            throw await ControllerError.badRequest({
                message: errors.details.map((error) => error.message)
            })
        }
    }
    async login(req: requestType) {
        try {
            await LoginSchemaBody.validateAsync(req.body, {
                abortEarly: false
            })
        } catch (e) {
            const errors = e as ValidationError
            throw await ControllerError.badRequest({
                message: errors.details.map((error) => error.message)
            })
        }
    }
    async addFriend(req: requestType) {
        try {
            await AddFriendSchemaBody.validateAsync(req.body, {
                abortEarly: false
            })
        } catch (e) {
            const errors = e as ValidationError
            throw await ControllerError.badRequest({
                message: errors.details.map((error) => error.message)
            })
        }
    }
    async acceptFriendRequest(req: requestType) {
        try {
            await AcceptFriendRequestSchemaBody.validateAsync(req.body, {
                abortEarly: false
            })
        } catch (e) {
            const errors = e as ValidationError
            throw await ControllerError.badRequest({
                message: errors.details.map((error) => error.message)
            })
        }
    }
    async getPangolinRequest(req: requestType) {
        try {
            await GetPangolinSchemaQuery.validateAsync(req.query, {
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
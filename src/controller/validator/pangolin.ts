import { RegisterSchemaBody, LoginSchemaBody, AddFriendSchemaBody, AcceptFriendRequestSchemaBody, GetPangolinSchemaQuery, TokenHeader } from '../schema'
import { Request } from 'express'
import { ValidationError } from 'joi'
import { ControllerError } from '../error'
export class PangolinValidator {
    async register(req: Request) {
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
    async login(req: Request) {
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
    async addFriend(req: Request) {
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
    async acceptFriendRequest(req: Request) {
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
    async getPangolinRequest(req: Request) {
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
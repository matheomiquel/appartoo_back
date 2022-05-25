import { RegisterSchema, LoginSchema, addFriendSchema, acceptFriendRequestSchema } from '../schema'
import { Request } from 'express'
import { ValidationError } from 'joi'
import { ControllerError } from '../error'
export class PangolinValidator {
    async register(req: Request) {
        try {
            await RegisterSchema.validateAsync(req.body, {
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
            await LoginSchema.validateAsync(req.body, {
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
            await addFriendSchema.validateAsync(req.body, {
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
            await acceptFriendRequestSchema.validateAsync(req.body, {
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
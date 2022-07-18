import { Request, Response } from 'express'
import { PangolinDomain } from '../../domain'
import { UserValidator } from '../validator'
import { ErrorType } from '../../errorType';
import { hash } from 'bcrypt'
import { responseType } from '../routes/type'
import { RegisterTypeResponse, LoginTypeResponse } from '../schema'
import { requestType } from '../routes/type'
export class UserService {
    private readonly pangolinDomain: PangolinDomain
    private readonly userValidator: UserValidator
    constructor({ pangolinDomain, userValidator }: { pangolinDomain: PangolinDomain, userValidator: UserValidator }) {
        this.pangolinDomain = pangolinDomain
        this.userValidator = userValidator
    }
    async register(req: requestType): responseType<RegisterTypeResponse> {
        await this.userValidator.register(req)
        const registerData = {
            name: req.body.name,
            email: req.body.email,
            password: await hash(req.body.password, Number(process.env.SALT)),
            role_id: req.body.role_id
        }
        const pangolin = await this.pangolinDomain.register(registerData)
        const token = await this.pangolinDomain.createToken({ id: pangolin.id })
        return { status: 201, data: { pangolin, token } }
    }
    async login(req: requestType): responseType<LoginTypeResponse> {
        await this.userValidator.login(req)
        const loginData = {
            email: req.body.email,
            password: req.body.password
        }
        const pangolin = await this.pangolinDomain.login(loginData)
        const token = await this.pangolinDomain.createToken({ id: pangolin.id })
        return { status: 200, data: { pangolin, token } }

    }

    async addFriend(req: requestType) {
        await this.userValidator.addFriend(req)
        const decodedToken = await this.pangolinDomain.getToken({ token: String(req.token) })
        await this.pangolinDomain.addFriend({ id: decodedToken.id, friendId: req.body.friendId })
        return { status: 204, data: {} }
    }
    async acceptFriendRequest(req: requestType) {
        await this.userValidator.acceptFriendRequest(req)
        const decodedToken = await this.pangolinDomain.getToken({ token: String(req.token) })
        await this.pangolinDomain.acceptFriendRequest({ id: decodedToken.id, friendId: req.body.friendId })
        return { status: 204, data: {} }
    }

    async getMe(req: requestType) {
        const decodedToken = await this.pangolinDomain.getToken({ token: String(req.token) })
        const pangolin = await this.pangolinDomain.getById({ id: decodedToken.id })
        return { status: 200, data: { pangolin } }
    }
    async getAll(req: requestType) {
        await this.userValidator.getPangolinRequest(req)
        const getPangolinData = {
            order: String(req.query.order),
            limit: Number(req.query.limit),
            offset: Number(req.query.offset)
        }
        const pangolin = await this.pangolinDomain.getAll(getPangolinData)
        return { status: 200, data: { pangolin } }
    }
    async getAllExcpetMyFriend(req: requestType) {
        await this.userValidator.getPangolinRequest(req)
        const decodedToken = await this.pangolinDomain.getToken({ token: String(req.token) })
        const getPangolinData = {
            id: decodedToken.id,
            order: String(req.query.order),
            limit: Number(req.query.limit),
            offset: Number(req.query.offset)
        }
        const pangolin = await this.pangolinDomain.getAllExcpetMyFriend(getPangolinData)
        return { status: 200, data: { pangolin } }
    }
    async getFriends(req: requestType) {
        const decodedToken = await this.pangolinDomain.getToken({ token: String(req.token) })
        const pangolin = await this.pangolinDomain.getFriends({ id: decodedToken.id })
        return { status: 200, data: { pangolin } }
    }
    async updateRole(req: requestType) {
        const decodedToken = await this.pangolinDomain.getToken({ token: String(req.token) })
        const pangolin = await this.pangolinDomain.updateRole({ role_id: req.body.role_id, id: decodedToken.id })
        return { status: 200, data: { pangolin } }
    }
}
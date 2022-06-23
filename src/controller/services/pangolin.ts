import { Request, Response } from 'express'
import { PangolinDomain } from '../../domain'
import { PangolinValidator } from '../validator'
import { ErrorType } from '../../errorType';
import { hash } from 'bcrypt'

export class PangolinService {
    private readonly pangolinDomain: PangolinDomain
    private readonly pangolinValidator: PangolinValidator
    constructor({ pangolinDomain, pangolinValidator }: { pangolinDomain: PangolinDomain, pangolinValidator: PangolinValidator }) {
        this.pangolinDomain = pangolinDomain
        this.pangolinValidator = pangolinValidator
    }
    async register(req: Request, res: Response) {
        try {
            await this.pangolinValidator.register(req)
            const registerData = {
                name: req.body.name,
                email: req.body.email,
                password: await hash(req.body.password, Number(process.env.SALT)),
                role_id: req.body.role_id
            }
            const pangolin = await this.pangolinDomain.register(registerData)
            const token = await this.pangolinDomain.createToken({ id: pangolin.id })
            return res.status(201).send({ pangolin, token })
        } catch (e) {
            const error = await e as ErrorType
            return res.status(error.status).send({ message: error.message })
        }
    }
    async login(req: Request, res: Response) {
        try {
            await this.pangolinValidator.login(req)
            const loginData = {
                email: req.body.email,
                password: req.body.password
            }
            const pangolin = await this.pangolinDomain.login(loginData)
            const token = await this.pangolinDomain.createToken({ id: pangolin.id })
            res.status(200).send({ pangolin, token })
        } catch (e) {
            const error = await e as ErrorType
            return res.status(error.status).send({ message: error.message })
        }
    }

    async addFriend(req: Request, res: Response) {
        try {
            await this.pangolinValidator.addFriend(req)
            const decodedToken = await this.pangolinDomain.getToken({ token: String(req.headers.token) })
            await this.pangolinDomain.addFriend({ id: decodedToken.id, friendId: req.body.friendId })
            return res.status(204).send()
        } catch (e) {
            const error = await e as ErrorType
            return res.status(error.status).send({ message: error.message })
        }
    }
    async acceptFriendRequest(req: Request, res: Response) {
        try {
            await this.pangolinValidator.acceptFriendRequest(req)
            const decodedToken = await this.pangolinDomain.getToken({ token: String(req.headers.token) })
            await this.pangolinDomain.acceptFriendRequest({ id: decodedToken.id, friendId: req.body.friendId })
            return res.status(204).send()
        } catch (e) {
            const error = await e as ErrorType
            return res.status(error.status).send({ message: error.message })
        }
    }

    async getMe(req: Request, res: Response) {
        console.log(req)
        const decodedToken = await this.pangolinDomain.getToken({ token: String(req.headers.token) })
        const pangolin = await this.pangolinDomain.getById({ id: decodedToken.id })
        res.status(200).send(pangolin)
    }
    async getAll(req: Request, res: Response) {
        try {
            await this.pangolinValidator.getPangolinRequest(req)
            const getPangolinData = {
                order: String(req.query.order),
                limit: Number(req.query.limit),
                offset: Number(req.query.offset)
            }
            const pangolin = await this.pangolinDomain.getAll(getPangolinData)
            res.status(200).send(pangolin)
        } catch (e) {
            const error = await e as ErrorType
            return res.status(error.status).send({ message: error.message })
        }
    }
    async getAllExcpetMyFriend(req: Request, res: Response) {
        try {
            await this.pangolinValidator.getPangolinRequest(req)
            const decodedToken = await this.pangolinDomain.getToken({ token: String(req.headers.token) })
            const getPangolinData = {
                id: decodedToken.id,
                order: String(req.query.order),
                limit: Number(req.query.limit),
                offset: Number(req.query.offset)
            }
            const pangolin = await this.pangolinDomain.getAllExcpetMyFriend(getPangolinData)
            return res.status(201).send(pangolin)
        } catch (e) {
            const error = await e as ErrorType
            return res.status(error.status).send({ message: error.message })
        }
    }
    async getFriends(req: Request, res: Response) {
        const decodedToken = await this.pangolinDomain.getToken({ token: String(req.headers.token) })
        const pangolin = await this.pangolinDomain.getFriends({ id: decodedToken.id })
        res.status(200).send(pangolin)
    }
    async updateRole(req: Request, res: Response) {
        const decodedToken = await this.pangolinDomain.getToken({ token: String(req.headers.token) })
        const pangolin = await this.pangolinDomain.updateRole({ role_id: req.body.role_id, id: decodedToken.id })
        res.status(200).send(pangolin)
    }
}
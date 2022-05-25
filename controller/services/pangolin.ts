import { Request, Response } from 'express'
import { PangolinDomain } from '../../domain'
import { PangolinValidator } from '../validator'
import { ErrorType } from '../../errorType';
import { hash } from 'bcrypt'
import { sign, decode } from 'jsonwebtoken'
type tokenType = {
    id: number
}
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
            const token = sign({ id: pangolin.id }, String(process.env.PRIVATE_KEY))
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
            const token = sign({ id: pangolin.id }, String(process.env.PRIVATE_KEY))
            res.status(200).send({ pangolin, token })
        } catch (e) {

        }
    }

    async addFriend(req: Request, res: Response) {
        try {
            await this.pangolinValidator.addFriend(req)
            const decodedToken = decode(String(req.body.token)) as tokenType
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
            const decodedToken = decode(String(req.body.token)) as tokenType
            await this.pangolinDomain.acceptFriendRequest({ id: decodedToken.id, friendId: req.body.friendId })
            return res.status(204).send()
        } catch (e) {
            const error = await e as ErrorType
            return res.status(error.status).send({ message: error.message })
        }
    }

    async getMe(req: Request, res: Response) {
        const decodedToken = decode(String(req.body.token)) as tokenType
        const pangolin = await this.pangolinDomain.getById({ id: decodedToken.id })
        res.status(201).send(pangolin)
    }
    async getAll(req: Request, res: Response) {
        const pangolin = await this.pangolinDomain.getAll()
        res.status(201).send(pangolin)
    }
    async getAllExcpetMyFriend(req: Request, res: Response) {
        try {
            const decodedToken = decode(String(req.body.token)) as tokenType
            const pangolin = await this.pangolinDomain.getAllExcpetMyFriend({ id: decodedToken.id })
            return res.status(201).send(pangolin)
        } catch (e) {
            const error = await e as ErrorType
            return res.status(error.status).send({ message: error.message })
        }
    }
    async getFriends(req: Request, res: Response) {
        const decodedToken = decode(String(req.body.token)) as tokenType
        const pangolin = await this.pangolinDomain.getFriends({ id: decodedToken.id })
        res.status(201).send(pangolin)
    }
    async updateRole(req: Request, res: Response) {
        const decodedToken = decode(String(req.body.token)) as tokenType
        const pangolin = await this.pangolinDomain.updateRole({ role_id: req.body.role_id, id: decodedToken.id })
        res.status(201).send(pangolin)
    }
}
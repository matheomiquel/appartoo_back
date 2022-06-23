import { Request, Response } from 'express'
import { RoleDomain } from '../../domain'
export class RoleService {
    private readonly roleDomain: RoleDomain
    constructor({ roleDomain }: { roleDomain: RoleDomain }) {
        this.roleDomain = roleDomain
    }
    async getById(req: Request, res: Response) {
        const role = await this.roleDomain.getById({ id: Number(req.params.id) })
        res.status(200).send(role)
    }
    async getAll(req: Request, res: Response) {
        const role = await this.roleDomain.getAll()
        res.status(200).send(role)
    }
    async create(req: Request, res: Response) {
        res.status(201).send('toto')
    }
}
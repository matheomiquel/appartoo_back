import { Request, Response } from 'express'
export class RoleService {
    async getById(req: Request, res: Response) {
        
        res.status(201).send('toto')
    }
    async create(req: Request, res: Response) {
        res.status(201).send('toto')
    }
}
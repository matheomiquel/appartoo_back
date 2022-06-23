import { Express } from 'express'
import { RoleService } from '../services'
const endpoint = 'role'
export class RoleRoute {
    constructor({ app, roleService }: { app: Express, roleService: RoleService }) {
        app.get(`/${endpoint}/:id`,
            roleService.getById.bind({ ...roleService })
        )
        app.get(`/${endpoint}`,
            roleService.getAll.bind({ ...roleService })
        )
    }
}
import { RoleInterface, Role } from '../../domain'
import { RoleDB } from '../model'
import { RoleModel } from '../sequelizeModel'
export class RoleData implements RoleInterface {

    async getById({ id }: { id: number }): Promise<Role | null> {
        const role = await RoleModel.findByPk(id) as RoleDB
        if (role)
            return new Role(role)
        else return null
    }
    async getAll(): Promise<Role[]> {
        const rolesDB = await RoleModel.findAll() as RoleDB[]
        return rolesDB.map((role) => new Role(role))
    }
}
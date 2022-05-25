import { RoleInterface, Pangolin, Role } from '../../domain'
import { PangolinDB, RoleDB, PangolinWithRoleDB, PangolinWithFriend } from '../model'
import { PangolinModel, RoleModel } from '../../models'
import { DataError } from '../error'
export class RoleData implements RoleInterface {

    async getById({ id }: { id: number }): Promise<Role | null> {
        const role = await RoleModel.findByPk(id) as RoleDB
        if (role)
            return new Role({ ...role })
        else return null
    }
}
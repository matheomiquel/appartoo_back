import { Role } from '../model'
export interface RoleInterface {
    getById({ id }: { id: number }): Promise<Role | null>
    getAll(): Promise<Role[]>
}
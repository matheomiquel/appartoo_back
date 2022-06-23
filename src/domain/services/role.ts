import { RoleData } from '../../data'
import { DomainError } from '../error'
export class RoleDomain {
    private readonly roleProvider: RoleData
    constructor({ roleProvider }: { roleProvider: RoleData }) {
        this.roleProvider = roleProvider
    }

    async getById({ id }: { id: number }) {
        return this.roleProvider.getById({ id })
    }

    async getAll() {
        return this.roleProvider.getAll()
    }
}
import { RoleDB } from './roleDB'
export class PangolinWithRoleDB {
    id: number
    name: string
    email: string
    password: string
    role_id: number
    role: RoleDB
    constructor(
        { id, name, email, password, role_id, role }:
            { id: number, name: string, email: string, password: string, role_id: number, role: RoleDB }) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.role_id = role_id
        this.role = role
    }
}
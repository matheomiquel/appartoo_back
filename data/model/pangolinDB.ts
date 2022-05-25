export class PangolinDB {
    id: number
    name: string
    email: string
    password: string
    role_id: number
    constructor({ id, name, email, password, role_id }: { id: number, name: string, email: string, password: string, role_id: number }) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.role_id = role_id
    }
}
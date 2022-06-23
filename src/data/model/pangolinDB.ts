class PangolinDB {
    id: number
    name: string
    email: string
    password: string
    role_id: number
    createdAt: Date
    updatedAt: Date
    constructor({ id, name, email, password, role_id, createdAt, updatedAt, }:
        { id: number, name: string, email: string, password: string, role_id: number, createdAt: Date, updatedAt: Date }
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.role_id = role_id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}
export { PangolinDB }
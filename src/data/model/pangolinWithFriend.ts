import { PangolinWithRoleDB } from './pangolinWithRole'
export class PangolinWithFriend {
    id: number
    name: string
    email: string
    password: string
    role_id: number
    friend: PangolinWithRoleDB[]
    other_friend: PangolinWithRoleDB[]
    constructor({ id, name, email, password, role_id, friend, other_friend
    }: {
            id: number, name: string, email: string, password: string, role_id: number,
            friend: PangolinWithRoleDB[], other_friend: PangolinWithRoleDB[],
        }) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.role_id = role_id
        this.friend = friend
        this.other_friend = other_friend
    }
}
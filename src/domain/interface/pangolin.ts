import { Pangolin } from '../model'
export interface PangolinInterface {
    register({ name, email, password, role_id }: { name: string, email: string, password: string, role_id: number }): Promise<Pangolin>
    getByEmail({ email }: { email: string }): Promise<Pangolin | null>
    login({ email, password }: { email: string, password: string }): Promise<Pangolin>
    addFriend({ id, friendId }: { id: number, friendId: number }): Promise<undefined>
    acceptFriendRequest({ id, friendId }: { id: number, friendId: number }): Promise<undefined>
    getById({ id }: { id: number }): Promise<Pangolin>
    getAll({ order, limit, offset }: { order: string, limit: number, offset: number }): Promise<Pangolin[]>
    getAllExcpetMyFriend({ ids }: { ids: number[] }): Promise<Pangolin[]>
    getFriends({ id }: { id: number }): Promise<Pangolin[]>
    updateRole({ role_id, id }: { role_id: number, id: number }): Promise<Pangolin>
}
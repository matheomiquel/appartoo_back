import { PangolinData, RoleData } from '../../data'
import { DomainError } from '../error'
import { Pangolin } from '../model';
export class PangolinDomain {
    private readonly pangolinProvider: PangolinData
    private readonly roleProvider: RoleData
    constructor({ pangolinProvider, roleProvider }: { pangolinProvider: PangolinData, roleProvider: RoleData }) {
        this.pangolinProvider = pangolinProvider
        this.roleProvider = roleProvider
    }
    async register({ name, email, password, role_id }: { name: string, email: string, password: string, role_id: number }): Promise<Pangolin> {
        const role = await this.roleProvider.getById({ id: role_id })
        if (!role)
            throw await DomainError.notFound({ message: 'role not found' })
        const created = await this.pangolinProvider.getByEmail({ email })
        if (created) {
            throw await DomainError.conflict({ message: 'email already taken' })
        }
        return this.pangolinProvider.register({ name, email, password, role_id })
    }

    async login({ email, password }: { email: string, password: string }): Promise<Pangolin> {
        return this.pangolinProvider.login({ email, password })
    }

    async addFriend({ id, friendId }: { id: number, friendId: number }): Promise<undefined> {
        await this.pangolinProvider.getById({ id: friendId })
        const friends = await this.pangolinProvider.getFriends({ id })
        if (friends.some((friend) => friend.id === friendId))
            throw DomainError.conflict({ message: 'you are already friend with this pangolin !' })
        await this.pangolinProvider.addFriend({ id, friendId })
        return;
    }
    async acceptFriendRequest({ id, friendId }: { id: number, friendId: number }): Promise<undefined> {
        const friends = await this.pangolinProvider.acceptFriendRequest({ id, friendId })
        return;
    }

    async getById({ id }: { id: number }): Promise<Pangolin> {
        return this.pangolinProvider.getById({ id })
    }

    async getAll(): Promise<Pangolin[]> {
        return this.pangolinProvider.getAll()
    }
    async getAllExcpetMyFriend({ id }: { id: number }): Promise<Pangolin[]> {
        const friends = await this.pangolinProvider.getFriends({ id })
        const ids = friends.map((friend) => friend.id)
        ids.push(id)
        return this.pangolinProvider.getAllExcpetMyFriend({ ids })
    }

    async getFriends({ id }: { id: number }): Promise<Pangolin[]> {
        return this.pangolinProvider.getFriends({ id })
    }

    async updateRole({ role_id, id }: { role_id: number, id: number }): Promise<Pangolin> {
        return this.pangolinProvider.updateRole({ role_id, id })
    }
}
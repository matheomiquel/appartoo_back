import { PangolinInterface, Pangolin } from '../../domain'
import { PangolinDB, RoleDB, PangolinWithRoleDB, PangolinWithFriend, PangolinHasPangolinDB } from '../model'
import { PangolinHasPangolinModel,PangolinModel ,RoleModel} from '../sequelizeModel'
import { compare } from 'bcrypt'
import { DataError } from '../error'
import { Op } from 'sequelize'
export class PangolinData implements PangolinInterface {
    async register({ name, email, password, role_id }: { name: string, email: string, password: string, role_id: number }): Promise<Pangolin> {
        const role = await RoleModel.findByPk(role_id) as unknown as RoleDB
        const pangolin = await PangolinModel.create({
            name,
            email,
            password,
            role_id
        }) as unknown as PangolinDB
        return new Pangolin({ id: pangolin.id, name: pangolin.name, email: pangolin.email, role: role.name })
    }

    async getByEmail({ email }: { email: string }): Promise<Pangolin | null> {
        const pangolin = await PangolinModel.findOne({
            where: {
                email
            }
        }) as unknown as PangolinDB
        if (pangolin) {
            const role = await RoleModel.findByPk(pangolin.role_id) as unknown as RoleDB
            return new Pangolin({ id: pangolin.id, name: pangolin.name, email: pangolin.email, role: role.name })
        }
        return null
    }
    async login({ email, password }: { email: string, password: string }): Promise<Pangolin> {
        const pangolin = await PangolinModel.findOne({
            where: {
                email
            },
            include: ['role']
        }) as unknown as PangolinWithRoleDB
        if (!pangolin || await !compare(password, pangolin.password)) {
            throw DataError.notFound({ message: 'pangolin not found' })
        }
        return new Pangolin({ id: pangolin.id, name: pangolin.name, email: pangolin.email, role: pangolin.role.name })
    }
    async addFriend({ id, friendId }: { id: number, friendId: number }): Promise<undefined> {
        try {
            await PangolinHasPangolinModel.create({
                pangolin_id: id,
                friend_id: friendId
            })
            return;
        } catch (e) {
            throw DataError.notFound({
                message: 'pangolin not found'
            })
        }
    }

    async acceptFriendRequest({ id, friendId }: { id: number, friendId: number }): Promise<undefined> {
        const pangolin = await PangolinHasPangolinModel.findOne({
            where: {
                pangolin_id: friendId,
                friend_id: id,
            }
        }) as unknown as PangolinHasPangolinDB
        if (!pangolin) {
            throw DataError.notFound({
                message: 'pangolin not found'
            });
        }
        if (pangolin.state === 'ACCEPTED')
            throw await DataError.conflict({
                message: 'you already accept this pangolin'
            });
        await PangolinHasPangolinModel.update({
            state: 'ACCEPTED'
        },
            {
                where: {
                    pangolin_id: friendId,
                    friend_id: id,
                }
            })
        return;
    }

    async getById({ id }: { id: number }): Promise<Pangolin> {
        try {
            const pangolin = await PangolinModel.findByPk(id, {
                include: ['role']
            }) as unknown as PangolinWithRoleDB
            return new Pangolin({ id: pangolin.id, name: pangolin.name, email: pangolin.email, role: pangolin.role.name })
        } catch (e) {
            throw DataError.notFound({ message: 'pangolin not found' })
        }
    }

    async getAll({ order, limit, offset }: { order: string, limit: number, offset: number }): Promise<Pangolin[]> {
        const pangolins = await PangolinModel.findAll({
            offset: offset,
            limit: limit,
            order: [['createdAt', order]],
            include: ['role']
        }) as unknown as PangolinWithRoleDB[]
        return pangolins.map(pangolin => {
            return new Pangolin({ id: pangolin.id, name: pangolin.name, email: pangolin.email, role: pangolin.role.name })
        })
    }
    async getAllExcpetMyFriend({ ids }: { ids: number[] }): Promise<Pangolin[]> {
        const pangolins = await PangolinModel.findAll({
            where: {
                id: { [Op.notIn]: ids }
            },
            include: ['role']
        }) as unknown as PangolinWithRoleDB[]
        return pangolins.map(pangolin => {
            return new Pangolin({ id: pangolin.id, name: pangolin.name, email: pangolin.email, role: pangolin.role.name })
        })
    }

    async getFriends({ id }: { id: number }): Promise<Pangolin[]> {
        console.log(id)
        try {
            const pangolin = await PangolinModel.findByPk(id, {
                include: [{
                    model: PangolinModel,
                    as: 'other_friend',
                    through: { where: { state: 'ACCEPTED' } },
                    include: [{
                        model: RoleModel,
                        as: 'role',
                        attributes: ['name']
                    }],
                }, {
                    model: PangolinModel,
                    as: 'friend',
                    through: { where: { state: 'ACCEPTED' } },
                    include: [{
                        model: RoleModel,
                        as: 'role',
                        attributes: ['name']
                    }],
                }]
            }) as unknown as PangolinWithFriend
            const pangolinFriends = pangolin.other_friend.concat(pangolin.friend)
            return pangolinFriends.map(friend => {
                return new Pangolin({ id: friend.id, name: friend.name, email: friend.email, role: friend.role.name })
            })
        } catch (e) {
            console.log(e)
            throw DataError.notFound({ message: 'pangolin not found' })
        }
    }
    async updateRole({ role_id, id }: { role_id: number, id: number }): Promise<Pangolin> {
        await PangolinModel.update({
            role_id,
        }, {
                where: {
                    id
                }
            })
        const pangolin = await PangolinModel.findByPk(id, {
            include: ['role']
        }) as unknown as PangolinWithRoleDB
        return new Pangolin({ id: pangolin.id, name: pangolin.name, email: pangolin.email, role: pangolin.role.name })
    }
}
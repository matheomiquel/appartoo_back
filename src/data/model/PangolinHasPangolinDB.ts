import { CreationOptional } from 'sequelize'
export class PangolinHasPangolinDB {
    pangolin_id: number
    friend_id: number
    state: 'SEND' | 'ACCEPTED'
    createdAt: Date
    updatedAt: Date
    constructor({ pangolin_id, friend_id, state, createdAt, updatedAt, }:
        { pangolin_id: number, friend_id: number, state: 'SEND' | 'ACCEPTED', createdAt: Date, updatedAt: Date }) {
        this.pangolin_id = pangolin_id
        this.friend_id = friend_id
        this.state = state
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}
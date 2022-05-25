export class PangolinHasPangolinDB {
    id: number
    pangolin_id: number
    friend_id: number
    state: 'SEND' | 'ACCEPTED'
    constructor({ id, pangolin_id, friend_id, state }:
        { id: number, pangolin_id: number, friend_id: number, password: string, state: 'SEND' | 'ACCEPTED' }) {
        this.id = id
        this.pangolin_id = pangolin_id
        this.friend_id = friend_id
        this.state = state
    }
}
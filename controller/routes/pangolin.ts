import { Express } from 'express'
import { PangolinService } from '../services'
import { authMiddleware } from '../middleware'
const endpoint = 'pangolin'
export class PangolinRoute {
    constructor({ app, pangolinService }: { app: Express, pangolinService: PangolinService }) {
        app.post(`/register`,
            pangolinService.register.bind({ ...pangolinService })
        )
        app.post(`/login`,
            pangolinService.login.bind({ ...pangolinService })
        )
        app.post(`/${endpoint}/addFriend`,
            authMiddleware,
            pangolinService.addFriend.bind({ ...pangolinService })
        )
        app.post(`/${endpoint}/acceptFriendRequest`,
            authMiddleware,
            pangolinService.acceptFriendRequest.bind({ ...pangolinService })
        )
        app.get(`/${endpoint}/getMe`,
            authMiddleware,
            pangolinService.getMe.bind({ ...pangolinService })
        )
        app.get(`/${endpoint}/getAll`,
            authMiddleware,
            pangolinService.getAll.bind({ ...pangolinService })
        )
        app.get(`/${endpoint}/getAllExcpetMyFriend`,
            authMiddleware,
            pangolinService.getAllExcpetMyFriend.bind({ ...pangolinService })
        )
        app.get(`/${endpoint}/getFriends`,
            authMiddleware,
            pangolinService.getFriends.bind({ ...pangolinService })
        )
        app.put(`/${endpoint}/updateRole`,
            authMiddleware,
            pangolinService.updateRole.bind({ ...pangolinService })
        )
    }
}
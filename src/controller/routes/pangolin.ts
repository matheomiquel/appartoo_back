import { PangolinService } from '../services'
import { authMiddleware } from '../middleware'
import { CreateRoute } from './createRoutes'
const endpoint = 'pangolin'
export class PangolinRoute {
    constructor({ createRoute, pangolinService }: { createRoute: CreateRoute, pangolinService: PangolinService }) {
        createRoute.createRoute(
            {
                method: `post`,
                path: '/register',
                handler: pangolinService.register.bind({ ...pangolinService }),
            })
        createRoute.createRoute(
            {
                method: `post`,
                path: '/login',
                handler: pangolinService.login.bind({ ...pangolinService }),
            })
        createRoute.createRoute(
            {
                method: `post`,
                path: `/${endpoint}/addFriend`,
                middleware: [authMiddleware],
                handler: pangolinService.addFriend.bind({ ...pangolinService }),

            })
        createRoute.createRoute(
            {
                method: `post`,
                path: `/${endpoint}/acceptFriendRequest`,
                middleware: [authMiddleware],
                handler: pangolinService.acceptFriendRequest.bind({ ...pangolinService }),
            })
        createRoute.createRoute(
            {
                method: `get`,
                path: `/${endpoint}/getMe`,
                middleware: [authMiddleware],
                handler: pangolinService.getMe.bind({ ...pangolinService }),
            })
        createRoute.createRoute(
            {
                method: `get`,
                path: `/${endpoint}/getAll`,
                middleware: [authMiddleware],
                handler: pangolinService.getAll.bind({ ...pangolinService }),
            })
        createRoute.createRoute(
            {
                method: `get`,
                path: `/${endpoint}/getAllExcpetMyFriend`,
                middleware: [authMiddleware],
                handler: pangolinService.getAllExcpetMyFriend.bind({ ...pangolinService }),
            })
        createRoute.createRoute(
            {
                method: `get`,
                path: `/${endpoint}/getFriends`,
                middleware: [authMiddleware],
                handler: pangolinService.getFriends.bind({ ...pangolinService }),
            })
        createRoute.createRoute(
            {
                method: `put`,
                path: `/${endpoint}/updateRole`,
                middleware: [authMiddleware],
                handler: pangolinService.updateRole.bind({ ...pangolinService }),
            })
    }
}
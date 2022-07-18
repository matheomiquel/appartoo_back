import { UserService,RoleService } from '../services'
import { authMiddleware } from '../middleware'
import { CreateRoute } from './createRoutes'
const endpoint = 'user'
export class UserRoute {
    constructor({ createRoute, userService }: { createRoute: CreateRoute, userService: UserService }) {
        createRoute.createRoute2(
            {
                method: `post`,
                path: '/register',
                handler: userService.register,
                context: userService
            })
        createRoute.createRoute2(
            {
                method: `post`,
                path: '/login',
                handler: userService.login,
                context: userService
            })
        createRoute.createRoute2(
            {
                method: `post`,
                path: `/${endpoint}/addFriend`,
                middleware: [authMiddleware],
                handler: userService.addFriend,
                context: userService

            })
        createRoute.createRoute2(
            {
                method: `post`,
                path: `/${endpoint}/acceptFriendRequest`,
                middleware: [authMiddleware],
                handler: userService.acceptFriendRequest,
                context: userService
            })
        createRoute.createRoute2(
            {
                method: `get`,
                path: `/${endpoint}/getMe`,
                middleware: [authMiddleware],
                handler: userService.getMe,
                context: userService
            })
        createRoute.createRoute2(
            {
                method: `get`,
                path: `/${endpoint}/getAll`,
                middleware: [authMiddleware],
                handler: userService.getAll,
                context: userService
            })
        createRoute.createRoute2(
            {
                method: `get`,
                path: `/${endpoint}/getAllExcpetMyFriend`,
                middleware: [authMiddleware],
                handler: userService.getAllExcpetMyFriend,
                context: userService
            })
        createRoute.createRoute2(
            {
                method: `get`,
                path: `/${endpoint}/getFriends`,
                middleware: [authMiddleware],
                handler: userService.getFriends,
                context: userService
            })
        createRoute.createRoute2(
            {
                method: `put`,
                path: `/${endpoint}/updateRole`,
                middleware: [authMiddleware],
                handler: userService.updateRole,
                context: userService
            })
    }
}
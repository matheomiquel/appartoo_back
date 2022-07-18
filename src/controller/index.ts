export { UserRoute, RoleRoute, CreateRoute } from './routes'
export { UserService, RoleService } from './services'
export { UserValidator } from './validator'
export {
    registerSwagger,
    AcceptFriendRequestSwagger,
    addFriendSwagger,
    loginSwagger,
    getAllSwager,
    getAllExceptMyfriendSwagger,
    getfriendSwagger,
    getMeSwagger,
    tags as swaggerTags
} from './swagger'
export { swaggerConfig } from './swagger'
import { methodType } from './methodType'
import { Express, Handler } from 'express'
export class CreateRoute {
    private readonly app: Express
    constructor({ app }: { app: Express }) {
        this.app = app
    }
    createRoute({ method, middleware = [], handler, path }:
        { method: methodType, middleware?: Handler[], handler: Handler, path: string }) {
        this.app[method](path, middleware, handler)
    }
}
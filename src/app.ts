import { PangolinData, RoleData } from './data'
import { PangolinDomain, RoleDomain } from './domain'
import { UserService, UserRoute, RoleService, RoleRoute } from './controller'
import { config } from 'dotenv'
import { UserValidator } from './controller'
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as Express from 'express'
import { Request, Response,request,response } from 'express'
import * as swaggerUI from 'swagger-ui-express';
import { swaggerConfig } from './controller'
import { CreateRoute } from './controller'
const app = Express()

app.use(cors());
app.use(bodyParser.json());
let path = ".env";
if (process.env.APP_ENV) {
    path = `${path}.${process.env.APP_ENV}`;
}
config({ path: path });
const PORT = process.env.PORT ?? 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));
const createRoute = new CreateRoute({ app })
//////////////////////////////////////////DATA//////////////////////////////////////////

const roleData = new RoleData()
const pangolinData = new PangolinData()

//////////////////////////////////////////DOMAIN//////////////////////////////////////////

const roleDomain = new RoleDomain({ roleProvider: roleData })
const pangolinDomain = new PangolinDomain({ pangolinProvider: pangolinData, roleProvider: roleData })

//////////////////////////////////////////VALIDATOR//////////////////////////////////////////

const userValidator = new UserValidator()

//////////////////////////////////////////CONTROLLER//////////////////////////////////////////
const roleService = new RoleService({ roleDomain })
const userService = new UserService({ pangolinDomain, userValidator })



//////////////////////////////////////////ROUTES//////////////////////////////////////////

new RoleRoute({ app, roleService })
new UserRoute({ createRoute, userService })

app.get('/health', async function (req: Request, res: Response) {
    res.status(204).send()
})

app.post('*', async function (req: Request, res: Response) {
    res.status(404).send({
        message: 'route not found'
    })
})


app.listen(PORT)
console.log(`server start on port ${PORT}`)


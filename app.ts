import { PangolinData, RoleData } from './data'
import { PangolinDomain, RoleDomain } from './domain'
import { PangolinService, PangolinRoute, } from './controller'
import { config } from 'dotenv'
import { PangolinValidator } from './controller'
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as Express from 'express'
import { Request, Response } from 'express'
const app = Express()
app.use(cors());
app.use(bodyParser.json());
let path = ".env";
if (process.env.APP_ENV) {
    path = `${path}.${process.env.APP_ENV}`;
}
config({ path: path });
const roleData = new RoleData()
const pangolinValidator = new PangolinValidator()
const pangolinData = new PangolinData()
const pangolinDomain = new PangolinDomain({ pangolinProvider: pangolinData, roleProvider: roleData })
const pangolinService = new PangolinService({ pangolinDomain, pangolinValidator })
const PORT = process.env.PORT ?? 3000;
new PangolinRoute({ app, pangolinService })
app.get('/health', async function (req: Request, res: Response) {
    res.status(204)
})

app.all('*', async function (req: Request, res: Response) {
    res.status(404).send({
        message : 'route not found'
    })
})
app.listen(3000)
console.log(`server start on port ${PORT}`)


import * as Joi from 'joi'
import { PangolinResponse } from './pangolin'

const PangolinsResponse = Joi.array().items(PangolinResponse)

export { PangolinsResponse };
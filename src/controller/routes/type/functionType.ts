import { Request } from 'express'
import { responseType } from './responseType'
import { requestType}from './requestType'
export type functionType = (req: requestType) => responseType<{}>
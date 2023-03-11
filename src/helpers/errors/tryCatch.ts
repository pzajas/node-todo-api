/* eslint-disable padded-blocks */
import { type NextFunction, type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_ERRORS } from '../interfaces/http/http'

let errorStatus: number
let errorMessage: string

export const tryCatch = (func: any): any => {
  return async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {

      switch (req.originalUrl) {
        case '/register':
          errorMessage = HTTP_ERRORS.REGISTER
          errorStatus = HTTP_CODES.BAD_REQUEST
          break
        case '/login':
          errorMessage = HTTP_ERRORS.LOGIN
          errorStatus = HTTP_CODES.BAD_REQUEST
          break
        case '/refresh':
          errorMessage = HTTP_ERRORS.REFRESH
          errorStatus = HTTP_CODES.BAD_REQUEST
          break
        case '/logout':
          errorMessage = HTTP_ERRORS.LOGOUT
          errorStatus = HTTP_CODES.UNAUTHORIZED
          break
      }

      await func(req, res, next)
      next()
    } catch (error: any) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({ status: errorStatus, message: errorMessage })
    }
  }
}

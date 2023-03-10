import { type NextFunction, type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_ERRORS } from '../interfaces/http/http'

let errorStatus: number
let errorMessage: string

export const tryCatch = (func: any) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl === '/register') {
      errorMessage = HTTP_ERRORS.REGISTER
      errorStatus = HTTP_CODES.BAD_REQUEST
    }

    if (req.originalUrl === '/login') {
      errorMessage = HTTP_ERRORS.LOGIN
      errorStatus = HTTP_CODES.BAD_REQUEST
    }

    if (req.originalUrl === '/refresh') {
      errorMessage = HTTP_ERRORS.REFRESH
      errorStatus = HTTP_CODES.BAD_REQUEST
    }

    if (req.originalUrl === '/logout') {
      errorMessage = HTTP_ERRORS.LOGOUT
      errorStatus = HTTP_CODES.UNAUTHORIZED
    }

    try {
      await func(req, res, next)
      next()
    } catch (error) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({ status: errorStatus, message: errorMessage })
    }
  }
}

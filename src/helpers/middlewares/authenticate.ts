/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { HTTP_CODES, HTTP_ERRORS } from '../interfaces/http/http'

let errorStatus: number
let errorMessage: string

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.cookie?.split('token=')[1]

    const isValidToken = jwt.decode(token as string)
    if (!isValidToken) throw new Error()
    next()
  } catch {
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
      case '/todos':
        errorMessage = HTTP_ERRORS.USER_IS_UNAUTHORIZED
        errorStatus = HTTP_CODES.UNAUTHORIZED
        break
      case `/todos${req.path}`:
        errorMessage = HTTP_ERRORS.USER_IS_UNAUTHORIZED
        errorStatus = HTTP_CODES.UNAUTHORIZED
        break
    }
    return res.status(errorStatus).json({ status: errorStatus, message: errorMessage })
  }
}

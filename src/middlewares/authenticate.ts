/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { HTTP_CODES } from '../libs/http'
import { VALIDATION_ERRORS } from '../validation/messages/validation'

let errorStatus: number
let errorMessage: string

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.cookie?.split('token=')[1]

    const isValidToken = jwt.decode(token as string)
    if (!isValidToken) throw new Error()
    next()
  } catch (err) {
    switch (req.originalUrl) {
      case '/register':
        errorMessage = VALIDATION_ERRORS.REGISTER
        errorStatus = HTTP_CODES.BAD_REQUEST
        break
      case '/login':
        errorMessage = VALIDATION_ERRORS.LOGIN
        errorStatus = HTTP_CODES.BAD_REQUEST
        break
      case '/refresh':
        errorMessage = VALIDATION_ERRORS.REFRESH
        errorStatus = HTTP_CODES.BAD_REQUEST
        break
      case '/logout':
        errorMessage = VALIDATION_ERRORS.LOGOUT
        errorStatus = HTTP_CODES.UNAUTHORIZED
        break
      case '/todos':
        errorMessage = VALIDATION_ERRORS.USER_IS_UNAUTHORIZED
        errorStatus = HTTP_CODES.UNAUTHORIZED
        break
      case `/todos${req.path}`:
        errorMessage = VALIDATION_ERRORS.USER_IS_UNAUTHORIZED
        errorStatus = HTTP_CODES.UNAUTHORIZED
        break
    }
    return res.status(errorStatus).json({ status: errorStatus, message: errorMessage })
  }
}

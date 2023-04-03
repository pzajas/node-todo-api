import {
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import jwt from 'jsonwebtoken'

import { HTTP_CODES } from '../libs/http'
import { VALIDATION_ERRORS } from '../validation/messages/validation'
import { customError } from '../helpers/functions/handling/customError'

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const headers = req.headers.cookie

    if (!headers) {
      throw customError(
        HTTP_CODES.UNAUTHORIZED,
        VALIDATION_ERRORS.USER_IS_UNAUTHORIZED
      )
    }

    const token = headers.split('token=')[1]

    const isValidToken = jwt.decode(token)

    if (!isValidToken) {
      throw customError(
        HTTP_CODES.UNAUTHORIZED,
        VALIDATION_ERRORS.USER_IS_UNAUTHORIZED
      )
    }

    next()
  } catch (err) {
    next(err)
  }
}

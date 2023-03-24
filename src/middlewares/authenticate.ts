/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import jwt from 'jsonwebtoken'
import { customError } from '../helpers/functions/handling/customError'

import { HTTP_CODES, HTTP_ERRORS } from '../libs/http'
import { VALIDATION_ERRORS } from '../validation/messages/validation'

let errorStatus: number
let errorMessage: string

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.cookie?.split('token=')[1]

    const isValidToken = jwt.decode(token as string)

    if (!isValidToken) {
      throw customError(
        HTTP_CODES.UNAUTHORIZED,
        VALIDATION_ERRORS.LOGOUT
      )
    }
    next()
  } catch (err) {
    next(err)
  }
}

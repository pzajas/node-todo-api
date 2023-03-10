/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import jwt from 'jsonwebtoken'

// import { env } from 'process'
import { HTTP_CODES, HTTP_ERRORS } from '../interfaces/http/http'

export const authenticate = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.cookie.split('token=')[1]

    const isValidToken = jwt.decode(token)
    if (isValidToken) {
      await next()
    }
  } catch {
    return res.status(HTTP_CODES.UNAUTHORIZED).json({ status: HTTP_CODES.UNAUTHORIZED, message: HTTP_ERRORS.LOGOUT })
  }
}

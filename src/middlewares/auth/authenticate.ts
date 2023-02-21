/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import jwt from 'jsonwebtoken'
import { env } from 'process'

import { HTTP_CODES, HTTP_STATUSES } from '../../interfaces/Responses/HTTP'

export const authenticate = (req: any, res: any, next: any) => {
  const token: string = req.headers.authorization.split(' ')[1]

  if (token === null) return res.status(401)
  try {
    jwt.verify(token, env.TOKEN_SECRET, (err: any, user: any) => {
      if (err) return { data: res.status(401).send({ msg: 'UNAUTHORIZED' }) }

      req.user = user
      next()
    })
  } catch {
    return res.status(HTTP_CODES.UNAUTHORIZED).json(HTTP_STATUSES.UNAUTHORIZED)
  }
}

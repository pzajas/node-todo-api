/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import jwt from 'jsonwebtoken'
import { env } from 'process'

export const authenticateUser = (req: any, res: any, next: any) => {
  const token = req.header.cookie.JWT

  if (token === null) return res.status(401)

  jwt.verify(token, env.TOKEN_SECRET, (err: any, user: any) => {
    if (err) res.status(403).send({ msg: 'Forbidden' })

    req.user = user
    next()
  })
}

// /* eslint-disable @typescript-eslint/no-unused-expressions */
// /* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { PrismaClient } from '@prisma/client'
// // import bcrypt from 'bcryptjs'
import { type Request, type Response } from 'express'

// import jwt from 'jsonwebtoken'
// import { env } from 'process'
import { HTTP_CODES, HTTP_STATUSES } from '../../interfaces/Responses/HTTP'

const prisma = new PrismaClient()

// const ACCESS_TOKEN_EXPIRATION_TIME = '24h'
// const REFRESH_TOKEN_EXPIRATION_TIME = '30d'

export const LogoutController = async (req: Request, res: Response): Promise<any> => {
  const tokenHeader = req.headers.authorization

  if (tokenHeader !== null && tokenHeader !== undefined) {
    const token = tokenHeader.split(' ')[1]

    await prisma.user.update({
      where: {
        token
      },
      data: {
        token: null,
        refreshToken: null
      }
    })

    return res.status(HTTP_CODES.OK).json(HTTP_STATUSES.OK)
  } else {
    return res.status(HTTP_CODES.UNAUTHORIZED).json(HTTP_STATUSES.UNAUTHORIZED)
  }
}

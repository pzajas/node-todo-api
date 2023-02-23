/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from 'process'

import { HTTP_CODES, HTTP_STATUSES } from '../../interfaces/Responses/HTTP'

const prisma = new PrismaClient()

const ACCESS_TOKEN_EXPIRATION_TIME = '30m'

export const RefreshController = async (req: Request, res: Response): Promise<any> => {
  const refreshToken = req.body.refreshToken

  refreshToken === null ? res.status(HTTP_CODES.UNAUTHORIZED).json({ ...HTTP_STATUSES.UNAUTHORIZED }) : null

  const user: any = await prisma.user.findUnique({
    where: {
      refreshToken
    }
  })

  if (user !== null && jwt.verify(user.refreshToken, env.REFRESH_SECRET)) {
    const accessToken = jwt.sign({ id: user.id }, env.TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME })

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        token: accessToken
      }
    })

    return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, token: accessToken })
  } else {
    return res.status(HTTP_CODES.UNAUTHORIZED).json(HTTP_STATUSES.UNAUTHORIZED)
  }
}

/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from 'process'

import { HTTP_CODES, HTTP_STATUSES } from '../../interfaces/Responses/HTTP'

const prisma = new PrismaClient()

const ACCESS_TOKEN_EXPIRATION_TIME = '24h'

export const RefreshController = async (req: Request, res: Response): Promise<any> => {
  const refreshToken = req.body.refreshToken

  if (!refreshToken) return res.status(HTTP_CODES.UNAUTHORIZED).json({ ...HTTP_STATUSES.UNAUTHORIZED })

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: env.LOGIN
      }
    })

    if ((user !== null) && jwt.verify(refreshToken, env.REFRESH_SECRET)) {
      const accessToken = jwt.sign(user, env.TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME })

      return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, token: accessToken })
    } else {
      return res.status(HTTP_CODES.UNAUTHORIZED).json(HTTP_STATUSES.UNAUTHORIZED)
    }
  } catch (error) {
    return res.status(HTTP_CODES.UNAUTHORIZED).json(HTTP_STATUSES.UNAUTHORIZED)
  }
}

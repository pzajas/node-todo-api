/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from 'process'

import { HTTP_CODES, HTTP_STATUSES } from '../../interfaces/Responses/HTTP'

const prisma = new PrismaClient()

const ACCESS_TOKEN_EXPIRATION_TIME = '24h'
const REFRESH_TOKEN_EXPIRATION_TIME = '30d'

export const LoginController = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body

  if (!username || !password) return res.status(HTTP_CODES.UNAUTHORIZED).json({ ...HTTP_STATUSES.UNAUTHORIZED })

  try {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if ((user != null) && await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(user, env.TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME })
      const refreshToken = jwt.sign(user, env.REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION_TIME })

      res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, token: accessToken, refreshToken })
    } else {
      return res.status(HTTP_CODES.UNAUTHORIZED).json({ ...HTTP_STATUSES.UNAUTHORIZED })
    }
  } catch (error) {
    return res.status(HTTP_CODES.INTERNAL_ERROR).json({ ...HTTP_STATUSES.INTERNAL_ERROR })
  }
}

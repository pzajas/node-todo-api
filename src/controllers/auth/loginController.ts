
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from 'process'

import { HTTP_CODES, HTTP_STATUSES } from '../../interfaces/Responses/HTTP'

const prisma = new PrismaClient()

const ACCESS_TOKEN_EXPIRATION_TIME = '10m'
const REFRESH_TOKEN_EXPIRATION_TIME = '30d'

export const LoginController = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body

  if (username === null || password === null) return res.status(HTTP_CODES.UNAUTHORIZED).json({ ...HTTP_STATUSES.UNAUTHORIZED })

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if ((user !== null) && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, env.TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME })
    const refreshToken = jwt.sign({ id: user.id }, env.REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION_TIME })

    const createdUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        token,
        refreshToken
      }
    })
    res.status(HTTP_CODES.OK).json({ createdUser, ...HTTP_STATUSES.OK })
  } else {
    return res.status(HTTP_CODES.UNAUTHORIZED).json({ ...HTTP_STATUSES.UNAUTHORIZED })
  }
}

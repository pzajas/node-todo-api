/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from 'process'

import { HTTP_CODES, HTTP_MESSAGES } from '../../interfaces/Responses/Responses'

const prisma = new PrismaClient()

export const AuthController = {
  register: async (req: Request, res: Response) => {
    const { username, email, password, todos } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        todos
      }
    })

    return res.status(HTTP_CODES.CREATED).send(user)
  },

  login: async (req: Request, res: Response) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(HTTP_CODES.UNAUTHORIZED).send({ message: HTTP_MESSAGES.UNAUTHORIZED })

    try {
      const user = await prisma.user.findUnique({
        where: {
          username
        }
      })

      if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(user, env.TOKEN_SECRET, { expiresIn: '30m' })
        const refreshToken = jwt.sign(user, env.REFRESH_SECRET, { expiresIn: '1d' })

        res.cookie('JWT', accessToken, {
          maxAge: 86400000,
          httpOnly: true
        })
        res.status(HTTP_CODES.OK).json({ message: HTTP_MESSAGES.OK, token: accessToken, refreshToken })
      } else {
        res.status(HTTP_CODES.UNAUTHORIZED).send(HTTP_MESSAGES.UNAUTHORIZED)
      }
    } catch (error) {
      res.status(HTTP_CODES.INTERNAL_ERROR).send({ msg: error })
    }
  },
  // CANNOT REFRESH CUZ FORBIDDEN - FIX TMRW
  refresh: async (req: any, res: any) => {
    const refreshToken = req.body.refreshToken

    const user: any = await prisma.user.findUnique({
      where: {
        username: env.USERNAME
      }
    })

    if (!refreshToken) {
      return res.status(HTTP_CODES.UNAUTHORIZED)
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const valid = await jwt.verify(refreshToken, env.REFRESH_SECRET)
      if (valid) {
        const accessToken = jwt.sign(user, env.TOKEN_SECRET, { expiresIn: '30m' })

        res.cookie('JWT', accessToken, {
          maxAge: 86400000,
          httpOnly: true
        }).send({ accessToken })
      }
    } catch {
      return res.sendStatus(HTTP_CODES.FORBIDDEN)
    }
  },

  logout: async (req: Request, res: Response) => {
    const token = req.cookies.JWT

    if (!token) res.status(HTTP_CODES.UNAUTHORIZED)

    const valid = jwt.verify(token, env.TOKEN_SECRET)

    try {
      if (valid) {
        res.clearCookie('JWT')
        res.status(HTTP_CODES.OK).json({ status: HTTP_CODES.OK, message: HTTP_MESSAGES.OK })
      }
    } catch (error) {
      res.status(HTTP_CODES.UNAUTHORIZED).json({ status: HTTP_CODES.UNAUTHORIZED, message: HTTP_MESSAGES.UNAUTHORIZED })
    }
  }
}

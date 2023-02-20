/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from 'process'

import { HTTP_CODES, HTTP_STATUSES } from '../../interfaces/Responses/HTTP'

const prisma = new PrismaClient()

const ACCESS_TOKEN_EXPIRATION_TIME = '30m'
const REFRESH_TOKEN_EXPIRATION_TIME = '30d'

const JWT_COOKIE_MAX_AGE = 86400000
const JWT_COOKIE_HTTP_ONLY = true

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

    return res.status(HTTP_CODES.CREATED).json({ ...HTTP_STATUSES.CREATED, user })
  },

  login: async (req: Request, res: Response) => {
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

        res.cookie('JWT', accessToken, {
          maxAge: JWT_COOKIE_MAX_AGE,
          httpOnly: JWT_COOKIE_HTTP_ONLY
        })

        res.status(HTTP_CODES.OK).json({ username: user.username, ...HTTP_STATUSES.OK, token: accessToken, refreshToken })
      } else {
        return res.status(HTTP_CODES.UNAUTHORIZED).json({ ...HTTP_STATUSES.UNAUTHORIZED })
      }
    } catch (error) {
      return res.status(HTTP_CODES.INTERNAL_ERROR).json({ ...HTTP_STATUSES.INTERNAL_ERROR })
    }
  },

  refresh: async (req: Request, res: Response) => {
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

        res.cookie('JWT', accessToken, {
          maxAge: JWT_COOKIE_MAX_AGE,
          httpOnly: JWT_COOKIE_HTTP_ONLY
        })

        return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, token: accessToken })
      } else {
        return res.status(HTTP_CODES.UNAUTHORIZED).json(HTTP_STATUSES.UNAUTHORIZED)
      }
    } catch (error) {
      return res.status(HTTP_CODES.UNAUTHORIZED).json(HTTP_STATUSES.UNAUTHORIZED)
    }
  },

  logout: async (req: Request, res: Response) => {
    const responseToken = req.headers.cookie
    let token = ''

    if (!responseToken) return res.status(HTTP_CODES.UNAUTHORIZED).json(HTTP_STATUSES.UNAUTHORIZED)

    try {
      responseToken.includes('JWT=') ? token = responseToken.slice(4) : token = responseToken

      const valid = jwt.verify(token, env.TOKEN_SECRET)

      if (valid) res.clearCookie('JWT').json(HTTP_STATUSES.OK)
    } catch (error) {
      return res.status(HTTP_CODES.UNAUTHORIZED).json(HTTP_STATUSES.UNAUTHORIZED)
    }
  }
}

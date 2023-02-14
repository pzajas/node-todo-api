/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const authToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization

  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) return res.status(401)
  try {
    jwt.verify(token, '123', (err: any, user: any) => {
      if (!err) {
        req.user = user
        next()
      } else {
        res.status(403).send({ msg: 'Forbidden' })
      }
    })
  } catch {
    res.send(500)
  }
}

export const AuthController = {
  register: async (req: any, res: any) => {
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

    return res.status(201).send(user)
  },

  login: async (req: Request, res: Response) => {
    const { username, password } = req.body

    const user: any = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (user === null) return res.status(400).send({ message: 'Cannot find the user' })
    if (await bcrypt.compare(password, user.password) && username === user.username) {
      const accessToken = jwt.sign(user, '123', { expiresIn: '1m' })
      const refreshToken = jwt.sign(user, '456', { expiresIn: '1d' })

      res.status(200).send({ msg: 'Logged in', accessToken, refreshToken })
    }
  },

  logout: (_req: Request, res: Response) => {
  },

  refresh: async (req: Request, res: Response) => {
    const refreshToken = req.body.token

    const user: any = await prisma.user.findUnique({
      where: {
        username: 'admin'
      }
    })

    if (!refreshToken) {
      return res.status(401)
    }

    try {
      jwt.verify(refreshToken, '321', (err: any, user: any) => {
        if (!err) {
          console.log(err)
        }
      })
    } catch {
      res.send(500)
    }

    const accessToken = jwt.sign(user, '123', { expiresIn: '1m' })

    res.send({ accessToken })
  }
}

/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

dotenv.config()

const prisma = new PrismaClient()

export const authenticateUser = (req: any, res: any, next: any) => {
  const token = req.cookies.JWT

  if (token === null) return res.status(401)

  jwt.verify(token, '123', (err: any, user: any) => {
    if (err) res.status(403).send({ msg: 'Forbidden' })

    req.user = user
    next()
  })
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

    try {
      const valid = await bcrypt.compare(password, user.password) && username === user.username

      if (valid) {
        const accessToken = jwt.sign(user, '123', { expiresIn: '30s' })
        const refreshToken = jwt.sign(user, '456', { expiresIn: '1d' })

        res.cookie('JWT', accessToken, {
          maxAge: 86400000,
          httpOnly: true
        })

        res.status(200).send({ msg: 'Logged in', accessToken, refreshToken })
      }
    } catch (error) {
      res.status(500).send({ msg: error })
    }
  },

  refresh: async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken

    const user: any = await prisma.user.findUnique({
      where: {
        username: 'admin'
      }
    })

    if (!refreshToken) {
      return res.status(401)
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const valid = await jwt.verify(refreshToken, '456')
      if (valid) {
        const accessToken = jwt.sign(user, '123', { expiresIn: '1m' })

        res.cookie('JWT', accessToken, {
          maxAge: 86400000,
          httpOnly: true
        }).send({ accessToken })
      }
    } catch {
      return res.sendStatus(403)
    }
  },

  logout: async (req: Request, res: Response) => {
    const user: any = await prisma.user.findUnique({
      where: {
        username: 'admin'
      }
    })

    if (!user) {
      return res.status(401)
    }

    try {
      jwt.verify(user, '123', (err: any, user: any) => {
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

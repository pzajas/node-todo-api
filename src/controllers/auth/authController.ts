import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { type Request, type Response } from 'express'

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

    return res.status(201).send(user)
  },

  login: async (req: Request, res: Response) => {
    const { username, password } = req.body

    const user: any = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (user === null) res.status(400).send({ message: 'Cannot find the user' })

    try {
      if (await bcrypt.compare(password, user.password) || username !== user.username) return res.status(200).send('Logged in')
      else return res.status(401).send('Failure')
    } catch (error: any) {
      return res.status(500).send('500')
    }
  },

  logout: (_req: Request, res: Response) => {
  }
}

import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

const prisma = new PrismaClient()

export const UserController = {
  getUsers: async (_req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      orderBy: {
        id: 'asc'
      }
    })
    res.send(users)
  },

  getUser: async (req: Request, res: Response) => {
    const id = +req.params.id
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return res.send(user)
  },

  postUser: async (req: Request, res: Response) => {
    const user = await prisma.user.create({
      data: {
        username: 'Admin.Admin',
        email: 'Admin@gmail.com',
        password: 'admin',
        token: 'aaa',
        refreshToken: 'aaa',
        todos: {}
      }
    })
    return res.send(user)
  },

  updateUser: async (req: Request, res: Response) => {
    const id = +req.params.id
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        username: 'Admin.Update'
      }
    })
    return res.send(user)
  },

  deleteUser: async (req: Request, res: Response) => {
    const id = +req.params.id
    const user = await prisma.user.delete({
      where: {
        id
      }
    })
    return res.send(user)
  }
}

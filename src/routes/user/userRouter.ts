/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client'
import express, { type Request, type Response } from 'express'

export const userRouter = express.Router()

const prisma = new PrismaClient()

userRouter.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    where: {
      email: { endsWith: '.com' }
    },
    orderBy: {
      id: 'asc'
    }
  })
  return res.json(users)
})

userRouter.post('/', async (req: Request, res: any) => {
  const users = await prisma.user.create({
    data: {
      username: 'Dash',
      password: 'Dash',
      email: 'dash@gmail.com',
      todos: {}
    }
  })
  return res.json(users)
})

userRouter.patch('/', async (req: Request, res: Response) => {
  const users = await prisma.user.update({
    where: {
      username: 'Dash'
    },
    data: {
      username: 'Rainbow'
    }
  })
  return res.json(users)
})

userRouter.delete('/', async (req: Request, res: any) => {
  const users = await prisma.user.delete({
    where: {
      username: 'Dash'
    }
  })
  return res.json(users)
})

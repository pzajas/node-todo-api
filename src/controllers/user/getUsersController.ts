import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import type { User } from '../../helpers/interfaces/user/user'

const prisma = new PrismaClient()

export const getUsersController = async (req: Request, res: Response): Promise<User> => {
  const users = await prisma.user.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
      todos: true
    }
  })

  return res.json(users)
}

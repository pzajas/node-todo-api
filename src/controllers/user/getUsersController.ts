import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../helpers/interfaces/http/http'
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

  return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, users })
}

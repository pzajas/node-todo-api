import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../helpers/interfaces/http/http'

const prisma = new PrismaClient()

interface Todo extends Response {
  id?: number
  value?: string
  completed?: boolean
  userId?: number
}

export const getTodoController = async (req: Request, res: Response): Promise<Todo> => {
  const id: number = +req.params.id

  const todo = await prisma.todo.findUnique({
    where: {
      id
    }
  })

  if (todo !== null) return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, todo })
  else throw new Error()
}

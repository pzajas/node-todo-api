import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../libs/http'

const prisma = new PrismaClient()

export const updateTodoController = async (req: Request, res: Response): Promise<Response> => {
  const id = +req.params.id
  const value = req.body.value

  const todo = await prisma.todo.update({
    where: {
      id
    },
    data: {
      value
    }
  })

  return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, todo })
}

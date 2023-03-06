import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../helpers/interfaces/http/http'

const prisma = new PrismaClient()

export const deleteTodoController = async (req: Request, res: Response): Promise<any> => {
  const id = +req.params.id

  const todo = await prisma.todo.delete({
    where: {
      id
    }
  })
  return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, todo })
}

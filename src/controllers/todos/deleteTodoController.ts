import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_MESSAGES } from '../../libs/http'

const prisma = new PrismaClient()

export const deleteTodoController = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (req.params.id === null) {
    throw new Error()
  }
  const id = +req.params.id

  const todo = await prisma.todo.delete({
    where: {
      id,
    },
  })
  return res.status(HTTP_CODES.OK).json({
    status: HTTP_CODES.OK,
    message: HTTP_MESSAGES.DELETED,
    todo,
  })
}

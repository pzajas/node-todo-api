import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'
import { customError } from '../../helpers/functions/handling/customError'

import { HTTP_CODES, HTTP_STATUSES } from '../../libs/http'
import { VALIDATION_ERRORS } from '../../validation/messages/validation'

const prisma = new PrismaClient()

interface Todo extends Response {
  id?: number
  value?: string
  completed?: boolean
  userId?: number
}

export const getTodoController = async (
  req: Request,
  res: Response
): Promise<Todo> => {
  const id: number = +req.params.id

  if (!id) {
    throw customError(
      HTTP_CODES.BAD_REQUEST,
      VALIDATION_ERRORS.TODO_ID_NOT_PROVIDED
    )
  }
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  })

  if (!todo) {
    throw customError(
      HTTP_CODES.NOT_FOUND,
      VALIDATION_ERRORS.TODO_NOT_FOUND
    )
  }

  return res
    .status(HTTP_CODES.OK)
    .json({ ...HTTP_STATUSES.OK, todo })
}

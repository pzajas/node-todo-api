import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'
import { customError } from '../../helpers/functions/handling/customError'

import { HTTP_CODES, HTTP_STATUSES } from '../../libs/http'
import { VALIDATION_ERRORS } from '../../validation/messages/validation'

const prisma = new PrismaClient()

export const updateTodoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = +req.params.id

  const value = req.body.value

  const todoFound = await prisma.todo.findUnique({
    where: {
      id,
    },
  })

  if (!todoFound) {
    throw customError(
      HTTP_CODES.NOT_FOUND,
      VALIDATION_ERRORS.TODO_NOT_FOUND
    )
  }

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      value,
    },
  })

  return res
    .status(HTTP_CODES.OK)
    .json({ ...HTTP_STATUSES.OK, todo })
}

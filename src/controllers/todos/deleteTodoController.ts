import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'
import { customError } from '../../helpers/functions/handling/customError'
import jwt from 'jsonwebtoken'

import { HTTP_CODES, HTTP_MESSAGES } from '../../libs/http'
import { VALIDATION_ERRORS } from '../../validation/messages/validation'

const prisma = new PrismaClient()

export const deleteTodoController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = +req.params.id

  const tokenFromHeaders =
    req.headers.cookie.split('token=')[1]
  const user: any = jwt.decode(tokenFromHeaders)
  const userId = user.id

  if (!id) {
    throw customError(
      HTTP_CODES.NOT_FOUND,
      VALIDATION_ERRORS.TODO_ID_NOT_PROVIDED
    )
  }

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

  if (todoFound.userId !== userId) {
    throw customError(
      HTTP_CODES.UNAUTHORIZED,
      VALIDATION_ERRORS.USER_IS_UNAUTHORIZED
    )
  }

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

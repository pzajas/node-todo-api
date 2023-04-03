import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'
import { customError } from '../../helpers/functions/handling/customError'

import { HTTP_CODES, HTTP_STATUSES } from '../../libs/http'
import { VALIDATION_ERRORS } from '../../validation/messages/validation'
import { decodeTokens } from '../../services/tokenService/decodeTokens'

const prisma = new PrismaClient()

interface Todo extends Response {
  id?: number
  value?: string
  completed?: boolean
  userId?: number
}

let id: number

export const getTodosController = async (
  req: Request,
  res: Response
): Promise<Todo> => {
  const headers = req.headers.cookie

  if (!headers) {
    throw customError(
      HTTP_CODES.UNAUTHORIZED,
      VALIDATION_ERRORS.USER_IS_UNAUTHORIZED
    )
  }

  const token = headers.split('token=')[1]

  if (!token) {
    throw customError(
      HTTP_CODES.UNAUTHORIZED,
      VALIDATION_ERRORS.USER_IS_UNAUTHORIZED
    )
  }

  id = await decodeTokens(token)

  const todosInDb = await prisma.todo.findMany({
    where: {
      userId: id,
    },
  })

  const todos =
    todosInDb.length === 0
      ? VALIDATION_ERRORS.TODO_LIST_IS_EMPTY
      : todosInDb

  return res
    .status(HTTP_CODES.OK)
    .json({ ...HTTP_STATUSES.OK, todos })
}

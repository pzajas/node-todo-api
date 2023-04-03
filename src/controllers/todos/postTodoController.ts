import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'
import { customError } from '../../helpers/functions/handling/customError'

import { HTTP_CODES, HTTP_STATUSES } from '../../libs/http'
// import { VALIDATION_ERRORS } from '../../validation/messages/validation'
import { VALIDATION_ERRORS } from '../../validation/messages/validation'
import { userIdFromCookieToken } from '../../services/tokenService/getUserIdFromCookieToken'

const prisma = new PrismaClient()
let id: number

export const postTodoController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const cookie = req.headers.cookie
  const value = req.body.value

  if (cookie !== null && cookie !== undefined) {
    id = await userIdFromCookieToken(cookie)
  }

  const todo = await prisma.todo.findUnique({
    where: {
      value,
    },
  })

  if (todo) {
    throw customError(
      HTTP_CODES.NOT_FOUND,
      VALIDATION_ERRORS.TODO_ALREADY_EXISTS
    )
  }

  await prisma.todo.create({
    data: {
      value,
      completed: false,
      user: {
        connect: {
          id,
        },
      },
    },
  })

  return res
    .status(HTTP_CODES.CREATED)
    .json({ ...HTTP_STATUSES.CREATED })
}

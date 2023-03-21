import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../libs/http'
import { userIdFromCookieToken } from '../../services/tokenService/getUserIdFromCookieToken'

const prisma = new PrismaClient()
let id: number

export const postTodoController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cookie = req.headers.cookie
  const value = req.body.value

  if (cookie !== null && cookie !== undefined) {
    id = await userIdFromCookieToken(cookie)
  }

  const newTodo = await prisma.todo.create({
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
    .json({ ...HTTP_STATUSES.CREATED, newTodo })
}

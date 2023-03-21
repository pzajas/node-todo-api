import { PrismaClient } from '@prisma/client'

import { userIdFromCookieToken } from '../../../services/tokenService/getUserIdFromCookieToken'

const prisma = new PrismaClient()
let id: number

export const createTestTodo = async (
  token: string
): Promise<any> => {
  const value = 'Mock Value'
  id = await userIdFromCookieToken(token)

  const todo = await prisma.todo.create({
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
  return todo.id
}

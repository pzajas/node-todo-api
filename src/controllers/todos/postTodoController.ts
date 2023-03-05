
import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import { decodeTokens } from '../../services/tokenService/decodeTokens'

const prisma = new PrismaClient()

// interface Todo extends Response {
//   id?: number
//   value?: string
//   completed?: boolean
//   userId?: number
// }
let id: number

export const postTodoController = async (req: Request, res: Response): Promise<Response> => {
  const headers = req.headers.cookie
  const value = req.body.value

  if (headers !== null && headers !== undefined) {
    const token = headers.split('token=')[1]
    id = await decodeTokens(token)
  }

  await prisma.todo.create({
    data: {
      value,
      completed: false,
      user: {
        connect: {
          id
        }
      }
    }

  })
  return res.status(200).json('xxx')
}

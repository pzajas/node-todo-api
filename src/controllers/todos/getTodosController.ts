import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../helpers/interfaces/http/http'
import { decodeTokens } from '../../services/tokenService/decodeTokens'

const prisma = new PrismaClient()

interface Todo extends Response {
  id?: number
  value?: string
  completed?: boolean
  userId?: number
}

let id: number

export const getTodosController = async (req: Request, res: Response): Promise<Todo> => {
  const headers = req.headers.cookie

  if (headers !== null && headers !== undefined) {
    const token = headers.split('token=')[1]
    id = await decodeTokens(token)
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: id
    }
  })

  return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, todos })
}

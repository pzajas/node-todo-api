import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

const prisma = new PrismaClient()

interface Todo extends Response {
  id?: number
  value?: string
  completed?: boolean
  userId?: number
}

export const getTodoController = async (req: Request, res: Response): Promise<Todo> => {
  const id: number = +req.params.id

  const todo = await prisma.todo.findUnique({
    where: {
      id
    }
  })

  return res.json(todo)
}

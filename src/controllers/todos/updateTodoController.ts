import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

const prisma = new PrismaClient()

export const updateTodoController = async (req: Request, res: Response): Promise<any> => {
  const id = +req.params.id
  const value = req.body.value

  const todo = await prisma.todo.update({
    where: {
      id
    },
    data: {
      value
    }
  })

  return res.json(todo)
}

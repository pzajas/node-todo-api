import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

const prisma = new PrismaClient()

export const deleteTodoController = async (req: Request, res: Response): Promise<any> => {
  const id = +req.params.id
  console.log(id)

  const todo = await prisma.todo.delete({
    where: {
      id
    }
  })
  return res.json(todo)
}

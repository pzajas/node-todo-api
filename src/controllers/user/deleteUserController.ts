import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import type { User } from '../../helpers/interfaces/user/user'

const prisma = new PrismaClient()

export const deleteUserController = async (req: Request, res: Response): Promise<User> => {
  const id = +req.params.id

  const user = await prisma.user.delete({
    where: {
      id
    }
  })
  return res.json(user)
}

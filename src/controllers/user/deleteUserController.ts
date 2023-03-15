import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../libs/http'
import type { User } from '../../helpers/interfaces/user/user'

const prisma = new PrismaClient()

export const deleteUserController = async (req: Request, res: Response): Promise<User> => {
  const id = +req.params.id

  await prisma.user.delete({
    where: {
      id
    }
  })
  return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK })
}

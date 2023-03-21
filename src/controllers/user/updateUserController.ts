import { PrismaClient } from '@prisma/client'
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../libs/http'
import type { User } from '../../helpers/interfaces/user/user'

const prisma = new PrismaClient()

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<User> => {
  const id = +req.params.id
  const username = req.body.username

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username,
    },
  })

  return res
    .status(HTTP_CODES.OK)
    .json({ ...HTTP_STATUSES.OK, user })
}

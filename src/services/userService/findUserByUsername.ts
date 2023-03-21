import { PrismaClient, type User } from '@prisma/client'

import { customError } from '../../helpers/functions/handling/customError'
import { HTTP_CODES, HTTP_ERRORS } from '../../libs/http'

const prisma = new PrismaClient()

export const findUserByUsername = async (
  username: string
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  return user
}

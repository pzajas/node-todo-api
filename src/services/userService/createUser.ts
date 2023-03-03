/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { PrismaClient, type User } from '@prisma/client'
import { isEmpty } from 'lodash'

const prisma = new PrismaClient()

export const createUser = async (username: string, email: string, password: string): Promise<User> => {
  if (!isEmpty(username) && !isEmpty(email) && !isEmpty(password)) {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    })
    return user
  } else { throw new Error() }
}

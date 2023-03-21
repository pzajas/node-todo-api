import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const result: boolean = false

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<boolean> => {
  await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  })

  return !result
}

import { PrismaClient, type User } from '@prisma/client'

const prisma = new PrismaClient()

export const createUser = async (
  username: string,
  password: string,
  email: string
): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      email,
    },
  })

  return user
}

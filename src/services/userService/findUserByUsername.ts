import { PrismaClient, type User } from '@prisma/client'

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

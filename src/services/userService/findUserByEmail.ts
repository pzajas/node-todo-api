import { PrismaClient, type User } from '@prisma/client'

const prisma = new PrismaClient()

export const findUserByEmail = async (
  email: string
): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  return user
}

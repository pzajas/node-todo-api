import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const findUserByRefreshToken = async (
  token: string
): Promise<any> => {
  const user = await prisma.token.findUnique({
    where: {
      token,
    },
  })

  return user
}

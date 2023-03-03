import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const findUserByRefreshToken = async (token: string): Promise<number> => {
  const data = await prisma.token.findUnique({
    where: {
      token
    }
  })

  if (data !== null) return data.userId

  else throw new Error()
}

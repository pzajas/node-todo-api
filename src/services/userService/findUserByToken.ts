import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const findUserByToken = async (token: string): Promise<number> => {
  const accessToken = await prisma.token.findUnique({
    where: {
      token
    }
  })

  if (accessToken != null && accessToken.type === 'ACCESS_TOKEN') return accessToken.userId
  else throw new Error()
}

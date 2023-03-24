import { PrismaClient } from '@prisma/client'
import { Response } from 'express'

const prisma = new PrismaClient()

export const deleteTokens = async (
  id: number
): Promise<void> => {
  await prisma.token.deleteMany({
    where: {
      userId: id,
    },
  })
}

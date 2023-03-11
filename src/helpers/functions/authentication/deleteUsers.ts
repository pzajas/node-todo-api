import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteUsers = async (): Promise<void> => {
  await prisma.user.deleteMany({})
}

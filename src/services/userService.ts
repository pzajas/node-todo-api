import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface User {
  username: string
  password: string
  email: string
}

export const listUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany({
    select: {
      username: true,
      password: true,
      email: true
    }
  })
}

export const createUser = async (user: User): Promise<User | null> => {
  const { username, password, email } = user

  return await prisma.user.create({
    data: {
      username,
      password,
      email
    },
    select: {
      username: true,
      password: true,
      email: true
    }
  })
}

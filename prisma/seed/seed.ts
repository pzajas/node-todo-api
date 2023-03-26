import { PrismaClient, Type } from '@prisma/client'
import { times } from 'lodash'

import {
  type IMockTodo,
  type IMockToken,
  type IMockUser,
} from '../interface/interfaces'
import { createRandomTodo } from './mock/mockTodo'
import { createRandomToken } from './mock/mockToken'
import { createRandomUser } from './mock/mockUser'

const prisma = new PrismaClient()

const seedDatabase = async (): Promise<any> => {
  const users = times(100, createRandomUser)
  const todos = times(25, createRandomTodo)
  const tokens = times(25, createRandomToken)

  users.map(
    async (user: IMockUser) =>
      await prisma.user.createMany({
        data: {
          username: user.username,
          password: user.password,
          email: user.email,
        },
        skipDuplicates: true,
      })
  )

  setTimeout(() => {
    todos.map(
      async (todo: IMockTodo) =>
        await prisma.todo.createMany({
          data: {
            value: todo.value,
            completed: todo.completed,
            userId: todo.userId,
          },
          skipDuplicates: true,
        })
    )

    tokens.map(
      async (token: IMockToken) =>
        await prisma.token.createMany({
          data: {
            token: token.token,
            type: Type.REFRESH_TOKEN,
            userId: token.userId,
          },
          skipDuplicates: true,
        })
    )
  }, 3000)
}

seedDatabase()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e: any) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

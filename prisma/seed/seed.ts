import { PrismaClient } from '@prisma/client'
import { adjectives, animals, names, uniqueNamesGenerator } from 'unique-names-generator'

import { createUser } from './user/createUser'

const prisma = new PrismaClient()

const seedDatabase = async (): Promise<void> => {
  const username = uniqueNamesGenerator({ dictionaries: [names] })
  const password = uniqueNamesGenerator({ dictionaries: [animals] })
  const activity = uniqueNamesGenerator({ dictionaries: [adjectives] })

  await prisma.user.upsert({
    where: { username },
    update: {},
    create: createUser(username, password, activity)
  })
}

for (let i = 0; i < 10; i++) {
  seedDatabase()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async e => {
      await prisma.$disconnect()
      process.exit(1)
    })
}

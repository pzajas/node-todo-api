// import { PrismaClient } from '@prisma/client'

// import { type User } from '../typescript/userTypes'
// import { createUsers } from './data/createUsers'

// const prisma = new PrismaClient()

// const users = createUsers()

// const seedDatabase = async (): Promise<void> => {
//   await Promise.all(
//     users.map(async (user: User) =>
//       await prisma.user.upsert({
//         where: { username: user.username },
//         update: {},
//         create: user
//       })
//     )
//   )
// }

// seedDatabase()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async e => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

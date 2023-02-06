import { type User } from '../../typescript/userTypes'
import { createRandomStatus, createRandomValue } from '../service/todoService'
import { createRandomName, createRandomPassword } from '../service/userService'

export const createRandomUser = (id: number): User => {
  const randomName = createRandomName()
  const randomPass = createRandomPassword()

  const randomMail = `${randomName}@gmail.com`

  const user = {
    id,
    username: randomName,
    email: randomMail,
    password: randomPass,

    todos: {
      create: [
        {
          value: createRandomValue(),
          status: createRandomStatus()
        },
        {
          value: createRandomValue(),
          status: createRandomStatus()
        }
      ]
    }
  }
  return user
}


import type { Seed } from '../../typescript/userTypes'

export const createUser = (username: string, password: string, value: string): Seed => {
  const email = `${username}.test@gmail.com`

  const user = {
    username,
    email,
    password,

    todos: {
      create: {
        value,
        status: 'completed'
      }
    }
  }
  return user
}

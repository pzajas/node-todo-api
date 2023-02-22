import { type Todo } from '../todo/interfaces'

export interface User {
  username: string
  password: string
  email: string

  token: string | null
  refreshToken: string | null

  todos: {
    create: Todo[]
  }
}

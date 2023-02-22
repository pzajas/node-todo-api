import { type Todo } from './todoTypes'

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

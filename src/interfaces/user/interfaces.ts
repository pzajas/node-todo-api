import { type Todo } from '../todo/interfaces'

export interface User {
  username: string
  password: string
  email: string

  todos: {
    create: Todo[]
  }
}

import { type Todo } from './todoTypes'

export interface User {
  username: string
  password: string
  email: string

  todos: {
    create: Todo[]
  }
}

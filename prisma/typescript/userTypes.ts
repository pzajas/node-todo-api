
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface User {
  id: number
  username: string
  password: string
  email: string
  todos: Todo[]
}

export interface Seed {
  username: string
  email: string
  password: string
  todos: {
    create: {
      value: string
      status: string
    }
  }
}

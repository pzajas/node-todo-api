export interface IUser {
  id: number
  username: string
  password: string
  email: string

  todos?: {
    create: Todo[]
  }
}

export interface Todo {
  value: string
  status: string
  author?: string
}

export interface ITokens {
  token: string
  refreshToken: string
}

export interface ICredentials {
  username: string
  password: string
}

import { type Type } from '@prisma/client'

export interface IMockUser {
  username: string
  password: string
  email: string
}

export interface IMockTodo {
  value: string
  completed: boolean
  userId: number
}

export interface IMockToken {
  token: string
  userId: number
  type: Type

}

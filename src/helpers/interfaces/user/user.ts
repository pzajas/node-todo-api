import { type Response } from 'express'

export interface User extends Response {
  id?: number
  email?: string
  username?: string
  password?: string
}

export interface ITokens {
  token: string
  refreshToken: string
}

export interface ICredentials {
  username: string
  password: string
}

/* eslint-disable padded-blocks */
import jwt from 'jsonwebtoken'
import { env } from 'process'

import { type ITokens } from '../../helpers/interfaces/user/user'
import { deleteTokens } from './deleteTokens'

const ACCESS_TOKEN_EXPIRATION_TIME = '10m'
const REFRESH_TOKEN_EXPIRATION_TIME = '30d'

let token: string
let refreshToken: string

export const createTokens = async (id: number): Promise<ITokens> => {

  await deleteTokens(id)

  token = jwt.sign({ id }, env.TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME })
  refreshToken = jwt.sign({ id }, env.REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION_TIME })

  return ({ token, refreshToken })
}

export const createNewToken = async (id: number): Promise<string> => {

  token = jwt.sign({ id }, env.TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME })

  return token
}

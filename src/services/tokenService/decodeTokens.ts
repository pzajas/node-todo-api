import jwt from 'jsonwebtoken'
import { env } from 'process'
import { customError } from '../../helpers/functions/handling/customError'

let userId: number

export const decodeTokens = async (
  token: string
): Promise<number> => {
  const decoded: any = jwt.decode(token)

  userId = decoded.id

  return userId
}

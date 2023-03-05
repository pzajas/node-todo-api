import jwt from 'jsonwebtoken'

let userId: number

export const decodeTokens = async (token: string): Promise<number> => {
  const decoded: any = jwt.decode(token)

  if (decoded.id !== null) {
    userId = decoded.id
  }

  return userId
}

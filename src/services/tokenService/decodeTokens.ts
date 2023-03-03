
import jwt from 'jsonwebtoken'

export const decodeTokens = async (token: string): Promise<any> => {
  const decoded: any = jwt.decode(token)

  if (decoded !== null) {
    const id = decoded.id
    console.log(decoded.id)

    return id
  }
}

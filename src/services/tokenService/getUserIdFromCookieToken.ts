import { decodeTokens } from './decodeTokens'

let id: number

export const userIdFromCookieToken = async (
  cookie: string
): Promise<number> => {
  if (!cookie.includes('token=')) {
    id = await decodeTokens(cookie)
  } else {
    const token = cookie.split('token=')[1]
    id = await decodeTokens(token)
  }
  return id
}

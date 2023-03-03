import bcrypt from 'bcryptjs'
import { isEmpty } from 'lodash'

let hashedPassword: string

export const createHashedPassword = async (password: string): Promise<string> => {
  if (!isEmpty(password)) { hashedPassword = await bcrypt.hash(password, 10) }

  return hashedPassword
}


import { type User } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const validateUserPassword = async (password: string, user: User): Promise<boolean> => {
  if (user !== null && await bcrypt.compare(password, user.password)) {
    return true
  } else throw new Error()
}

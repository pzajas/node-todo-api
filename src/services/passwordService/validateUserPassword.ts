import { type User } from '@prisma/client'
import bcrypt from 'bcryptjs'

export const validateUserPassword = async (
  password: string,
  user: User
): Promise<boolean> => {
  const result = await bcrypt.compare(
    password,
    user.password
  )

  return result
}

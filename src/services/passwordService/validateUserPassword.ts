import { type User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { customError } from '../../helpers/functions/handling/customError'
import { HTTP_CODES, HTTP_ERRORS } from '../../libs/http'

export const validateUserPassword = async (
  password: string,
  user: User
): Promise<boolean> => {
  await bcrypt.compare(password, user.password)

  return true
}

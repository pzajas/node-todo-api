/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type User } from '@prisma/client'
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../helpers/interfaces/http/http'
import { validateUserPassword } from '../../services/passwordService/validateUserPassword'
import { assignTokens } from '../../services/tokenService/assignTokens'
import { findUserByUsername } from '../../services/userService/findUserByUsername'

export const LoginController = async (req: Request, res: Response): Promise<Response> => {
  const { username, password }: Pick<User, 'username' | 'password'> = req.body

  const user: User = await findUserByUsername(username)

  const isValidPassword: boolean = await validateUserPassword(password, user)

  if (!user.username && !isValidPassword) throw new Error()

  const { token, refreshToken } = await assignTokens(user.id)

  res.cookie('token', token, { httpOnly: true })

  return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, ...user, token, refreshToken })
}

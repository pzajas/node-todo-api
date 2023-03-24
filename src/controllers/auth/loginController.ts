import { type User } from '@prisma/client'
import { type Request, type Response } from 'express'
import { assignTokens } from '../../services/tokenService/assignTokens'

import { customError } from '../../helpers/functions/handling/customError'
import { validateUserPassword } from '../../services/passwordService/validateUserPassword'
import { findUserByUsername } from '../../services/userService/findUserByUsername'

import {
  HTTP_CODES,
  HTTP_ERRORS,
  HTTP_MESSAGES,
} from '../../libs/http'
import { VALIDATION_ERRORS } from '../../validation/messages/validation'

export const LoginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    username,
    password,
  }: Pick<User, 'username' | 'password'> = req.body

  const user: User = await findUserByUsername(username)

  if (!user) {
    throw customError(
      HTTP_CODES.NOT_FOUND,
      VALIDATION_ERRORS.LOGIN
    )
  }

  const validPassword = await validateUserPassword(
    password,
    user
  )

  if (!validPassword) {
    throw customError(
      HTTP_CODES.NOT_FOUND,
      VALIDATION_ERRORS.LOGIN
    )
  }

  const { token, refreshToken } = await assignTokens(
    user.id
  )

  if (!token || !refreshToken) {
    throw customError(
      HTTP_CODES.NOT_FOUND,
      VALIDATION_ERRORS.LOGIN
    )
  }

  res.cookie('token', token, { httpOnly: true })

  return res.status(HTTP_CODES.OK).json({
    status: HTTP_CODES.OK,
    message: HTTP_MESSAGES.LOGIN,
    username,
    token,
    refreshToken,
  })
}

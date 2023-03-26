import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_MESSAGES } from '../../libs/http'
import { VALIDATION_ERRORS } from '../../validation/messages/validation'

import { createHashedPassword } from '../../services/passwordService/createHashedPassword'
import { createUser } from '../../services/userService/createUser'
import { customError } from '../../helpers/functions/handling/customError'
import { findUserByEmail } from '../../services/userService/findUserByEmail'
import { findUserByUsername } from '../../services/userService/findUserByUsername'

export const RegisterController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password, email } = req.body

  const nameExistsInDb = await findUserByUsername(username)
  const emailExistsInDb = await findUserByEmail(email)

  if (nameExistsInDb || emailExistsInDb) {
    throw customError(
      HTTP_CODES.CONFLICT,
      VALIDATION_ERRORS.USER_IS_TAKEN
    )
  }

  const hashed = await createHashedPassword(password)

  await createUser(username, hashed, email)

  return res.status(HTTP_CODES.CREATED).json({
    status: HTTP_CODES.CREATED,
    message: HTTP_MESSAGES.CREATED,
  })
}

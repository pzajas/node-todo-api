/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_MESSAGES } from '../../helpers/interfaces/http/http'
import { createHashedPassword } from '../../services/passwordService/createHashedPassword'
import { createUser } from '../../services/userService/createUser'

export const RegisterController = async (req: Request, res: Response): Promise <Response> => {
  const { username, email, password } = req.body

  const hashedPassword = await createHashedPassword(password)

  const isUserCreated = await createUser(username, email, hashedPassword)

  if (!isUserCreated) { return res.status(HTTP_CODES.BAD_REQUEST) }

  return res.status(HTTP_CODES.CREATED).json({ status: HTTP_CODES.CREATED, message: HTTP_MESSAGES.CREATED })
}

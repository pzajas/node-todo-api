
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../helpers/interfaces/http/http'
import { createHashedPassword } from '../../services/passwordService/createHashedPassword'
import { createUser } from '../../services/userService/createUser'

export const RegisterController = async (req: Request, res: Response): Promise <Response> => {
  const { username, email, password } = req.body

  const hashedPassword = await createHashedPassword(password)

  const data = await createUser(username, email, hashedPassword)

  return res.status(HTTP_CODES.CREATED).json({ ...HTTP_STATUSES.CREATED, data })
}

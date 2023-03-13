import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_MESSAGES } from '../../helpers/interfaces/http/http'
import { decodeTokens } from '../../services/tokenService/decodeTokens'
import { deleteTokens } from '../../services/tokenService/deleteTokens'

export const LogoutController = async (req: Request, res: Response): Promise<Response> => {
  const token = req.headers.cookie?.split('token=')[1]

  if (token === null || token === undefined) throw new Error()

  const id = await decodeTokens(token)
  await deleteTokens(id)

  return res.status(HTTP_CODES.OK).json({ status: HTTP_CODES.OK, message: HTTP_MESSAGES.OK })
}

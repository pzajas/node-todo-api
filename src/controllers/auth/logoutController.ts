import { type Request, type Response } from 'express'

import { customError } from '../../helpers/functions/handling/customError'
import { HTTP_CODES, HTTP_MESSAGES } from '../../libs/http'
import { decodeTokens } from '../../services/tokenService/decodeTokens'
import { deleteTokens } from '../../services/tokenService/deleteTokens'

export const LogoutController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = req.headers.cookie

  if (!token) {
    throw customError(
      HTTP_CODES.BAD_REQUEST,
      HTTP_MESSAGES.TOKEN_MUST_BE_VALID
    )
  }

  const id = await decodeTokens(token.split('token=')[1])

  await deleteTokens(id)

  return res.status(HTTP_CODES.OK).json({
    status: HTTP_CODES.OK,
    message: HTTP_MESSAGES.OK,
  })
}

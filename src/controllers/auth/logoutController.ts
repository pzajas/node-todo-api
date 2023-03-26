import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_MESSAGES } from '../../libs/http'
import { VALIDATION_ERRORS } from '../../validation/messages/validation'

import { customError } from '../../helpers/functions/handling/customError'
import { decodeTokens } from '../../services/tokenService/decodeTokens'
import { deleteTokens } from '../../services/tokenService/deleteTokens'

export const LogoutController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const tokenFromHeaders = req.headers.cookie

  if (!tokenFromHeaders) {
    throw customError(
      HTTP_CODES.UNAUTHORIZED,
      VALIDATION_ERRORS.USER_IS_UNAUTHORIZED
    )
  }

  const token = tokenFromHeaders.split('token=')[1]

  if (!token) {
    throw customError(
      HTTP_CODES.UNAUTHORIZED,
      VALIDATION_ERRORS.USER_IS_UNAUTHORIZED
    )
  }

  const userId = await decodeTokens(token)

  if (!userId) {
    throw customError(
      HTTP_CODES.UNAUTHORIZED,
      VALIDATION_ERRORS.USER_IS_UNAUTHORIZED
    )
  }

  await deleteTokens(userId)
  res.clearCookie('token')

  return res.status(HTTP_CODES.OK).json({
    status: HTTP_CODES.OK,
    message: HTTP_MESSAGES.OK,
  })
}

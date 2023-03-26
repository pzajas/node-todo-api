/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_MESSAGES } from '../../libs/http'

import { createNewToken } from '../../services/tokenService/createTokens'
import { customError } from '../../helpers/functions/handling/customError'
import { findUserByRefreshToken } from '../../services/userService/findUserByRefresh'

let newAccessToken: string

export const RefreshController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queryRefreshToken = req.body.refreshToken

  const user: any = await findUserByRefreshToken(
    queryRefreshToken
  )

  if (!user) {
    throw customError(
      HTTP_CODES.BAD_REQUEST,
      HTTP_MESSAGES.TOKEN_MUST_BE_VALID
    )
  }

  const userId = user.id

  if (userId) {
    const token = await createNewToken(userId)

    newAccessToken = token
    res.cookie('token', newAccessToken, { httpOnly: true })
  }
  return res.status(HTTP_CODES.OK).json({
    status: HTTP_CODES.OK,
    message: HTTP_MESSAGES.OK,
    newAccessToken,
  })
}

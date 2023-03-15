/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../libs/http'
import { createNewToken } from '../../services/tokenService/createTokens'
import { findUserByRefreshToken } from '../../services/userService/findUserByRefresh'

let newAccessToken: string

export const RefreshController = async (req: Request, res: Response): Promise<Response> => {
  const queryRefreshToken = req.body.refreshToken

  const userId: number = await findUserByRefreshToken(queryRefreshToken)

  if (userId) {
    const token = await createNewToken(userId)

    newAccessToken = token
    res.cookie('token', newAccessToken, { httpOnly: true })
  }
  return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, newAccessToken })
}

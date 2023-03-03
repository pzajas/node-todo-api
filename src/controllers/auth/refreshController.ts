/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../helpers/interfaces/http/http'
import { assignTokens } from '../../services/tokenService/assignTokens'
import { deleteTokens } from '../../services/tokenService/deleteTokens'
import { findUserByRefreshToken } from '../../services/userService/findUserByRefresh'

let refreshedToken: string

export const RefreshController = async (req: Request, res: Response): Promise<Response> => {
  const queryRefreshToken = req.body.refreshToken

  const userId: number = await findUserByRefreshToken(queryRefreshToken)

  if (userId) {
    await deleteTokens(userId)
    const { token } = await assignTokens(userId)

    refreshedToken = token
    res.cookie('token', token, { httpOnly: true })
  }
  return res.status(HTTP_CODES.OK).json({ ...HTTP_STATUSES.OK, refreshedToken })
}

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../helpers/interfaces/http/http'
import { decodeTokens } from '../../services/tokenService/decodeTokens'
import { deleteTokens } from '../../services/tokenService/deleteTokens'

export const LogoutController = async (req: Request, res: Response): Promise<Response> => {
  const headers = req.headers.cookie

  if (headers) {
    const token = headers.split('=')[1]

    const id = await decodeTokens(token)

    await deleteTokens(id)

    res.clearCookie('token')
  }

  return res.status(HTTP_CODES.OK).json(HTTP_STATUSES.OK)
}

/* eslint-disable @typescript-eslint/strict-boolean-expressions */

// import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcryptjs'
import { type Request, type Response } from 'express'

// import jwt from 'jsonwebtoken'
// import { env } from 'process'
import { HTTP_CODES, HTTP_STATUSES } from '../../interfaces/Responses/HTTP'

// const prisma = new PrismaClient()

// const ACCESS_TOKEN_EXPIRATION_TIME = '24h'
// const REFRESH_TOKEN_EXPIRATION_TIME = '30d'

export const LogoutController = async (req: Request, res: Response): Promise<any> => {
  return res.status(HTTP_CODES.OK).json(HTTP_STATUSES.OK)
}


import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { type Request, type Response } from 'express'

import { HTTP_CODES, HTTP_STATUSES } from '../../interfaces/Responses/HTTP'

const prisma = new PrismaClient()

export const RegisterController = async (req: Request, res: Response): Promise <any> => {
  const { username, email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword
    }
  })

  return res.status(HTTP_CODES.CREATED).json({ ...HTTP_STATUSES.CREATED, user })
}

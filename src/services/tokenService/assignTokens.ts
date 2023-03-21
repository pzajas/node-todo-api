import { PrismaClient } from '@prisma/client'

import { type ITokens } from '../../helpers/interfaces/user/user'
import { createTokens } from './createTokens'

const prisma = new PrismaClient()

export const assignTokens = async (
  userId: number
): Promise<ITokens> => {
  const { token, refreshToken } = await createTokens(userId)

  await prisma.token.create({
    data: {
      userId,
      token: refreshToken,
      type: 'REFRESH_TOKEN',
    },
  })

  return { token, refreshToken }
}


import { PrismaClient } from '@prisma/client'

import { type ITokens } from '../../helpers/interfaces/user/user'
import { createTokens } from './createTokens'

const prisma = new PrismaClient()

export const assignTokens = async (id: number): Promise<ITokens> => {
  const { token, refreshToken } = await createTokens(id)

  await prisma.token.create({
    data: {
      userId: id,
      token: refreshToken,
      type: 'REFRESH_TOKEN'
    }
  })

  return ({ token, refreshToken })
}

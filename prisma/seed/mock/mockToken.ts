import { random } from 'lodash'

import { type IMockToken } from '../../interface/interfaces'
import { createRandomName, createRandomTokenType } from '../service/tokenService'

export const createRandomToken = (): IMockToken => {
  const token = {
    token: createRandomName(),
    type: createRandomTokenType(),
    userId: random(1, 25)
  }

  return token
}


import { random } from 'lodash'

import { createRandomName } from '../service/userService'

export const createRandomStatus = (): boolean => false

export const createRandomToken = (): any => {
  const token = {
    token: createRandomName(),
    type: 'REFRESH_TOKEN',
    userId: random(1, 25)
  }
  return token
}

import { times } from 'lodash'

import { type User } from '../../typescript/userTypes'
import { createRandomUser } from '../mock/mockUser'

export const createUsers = (count = 10): User[] => times(count, id => createRandomUser(id))

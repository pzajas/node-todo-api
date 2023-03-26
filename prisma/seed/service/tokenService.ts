import { type Type } from '@prisma/client'
import {
  adjectives,
  animals,
  names,
  uniqueNamesGenerator,
} from 'unique-names-generator'

export const createRandomTokenType = (): Type =>
  'REFRESH_TOKEN'
export const createRandomName = (): string =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, names, animals],
  })

import {
  adjectives,
  animals,
  names,
  uniqueNamesGenerator,
} from 'unique-names-generator'

export const createRandomPassword = (): string =>
  uniqueNamesGenerator({ dictionaries: [animals] })

export const createRandomName = (): string =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, names, animals],
  })

export const createRandomEmail = (): string =>
  `${createRandomName()}@gmail.com`

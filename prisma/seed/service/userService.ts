import { animals, names, uniqueNamesGenerator } from 'unique-names-generator'

export const createRandomPassword = (): string => uniqueNamesGenerator({ dictionaries: [animals] })

export const createRandomName = (): string => uniqueNamesGenerator({ dictionaries: [names] })

export const createRandomEmail = (): string => {
  const name = uniqueNamesGenerator({ dictionaries: [names] })

  const randomEmail = `${name}@gmail.com`

  return randomEmail
}

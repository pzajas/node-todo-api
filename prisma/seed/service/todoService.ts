import {
  names,
  uniqueNamesGenerator,
} from 'unique-names-generator'

export const createRandomText = (): string =>
  uniqueNamesGenerator({ dictionaries: [names] })

export const createRandomStatus = (): boolean => false

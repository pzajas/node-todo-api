import { names, uniqueNamesGenerator } from 'unique-names-generator'

export const createRandomValue = (): string => uniqueNamesGenerator({ dictionaries: [names] })

export const createRandomStatus = (): string => uniqueNamesGenerator({ dictionaries: [names] })

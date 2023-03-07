
import { random } from 'lodash'
import { names, uniqueNamesGenerator } from 'unique-names-generator'

export const createRandomValue = (): string => uniqueNamesGenerator({ dictionaries: [names] })

export const createRandomStatus = (): boolean => false

export const createRandomTodo = (): any => {
  const todo = {
    value: createRandomValue(),
    completed: createRandomStatus(),
    userId: random(1, 25)
  }
  return todo
}

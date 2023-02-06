
import { names, uniqueNamesGenerator } from 'unique-names-generator'

import { type Todo } from '../../typescript/todoTypes'

const createRandomValue = (): string => uniqueNamesGenerator({ dictionaries: [names] })

const createRandomStatus = (): string => 'uncomplete'

export const createRandomTodo = (id: number): Todo => {
  const todo = {
    id,
    value: createRandomValue(),
    status: createRandomStatus()
  }
  return todo
}

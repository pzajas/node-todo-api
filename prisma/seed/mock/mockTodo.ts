import { random } from 'lodash'

import { type IMockTodo } from '../../interface/interfaces'
import {
  createRandomStatus,
  createRandomText,
} from '../service/todoService'

export const createRandomTodo = (): IMockTodo => {
  const todo = {
    value: createRandomText(),
    completed: createRandomStatus(),
    userId: random(1, 25),
  }

  return todo
}

import { times } from 'lodash'

import { type Todo } from '../../typescript/todoTypes'
import { createRandomTodo } from '../mock/mockTodo'

export const createTodos = (count = 10): Todo[] => times(count, id => createRandomTodo(id))

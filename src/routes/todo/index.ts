import { deleteTodo } from './deleteTodo'
import { getTodo } from './getTodo'
import { getTodos } from './getTodos'
import { patchTodo } from './patchTodo'
import { postTodo } from './postTodo'

export const todoRoutes = [
  getTodo,
  getTodos,
  postTodo,
  patchTodo,
  deleteTodo
]

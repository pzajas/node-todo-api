import { deleteTodoController as deleteTodo } from './deleteTodoController'
import { getTodoController as getTodo } from './getTodoController'
import { getTodosController as getTodos } from './getTodosController'
import { postTodoController as postTodo } from './postTodoController'
import { updateTodoController as updateTodo } from './updateTodoController'

export const TodosController = {
  getTodos,
  getTodo,
  postTodo,
  deleteTodo,
  updateTodo,
}

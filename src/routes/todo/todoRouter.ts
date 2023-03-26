/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { TodosController } from '../../controllers/todos/xindex'
import { authenticate } from '../../middlewares/authenticate'
import {
  patchTodoSchema,
  postTodoSchema,
  todoSchema,
} from '../../validation/schemas/todoSchemas'
import { tryCatch } from '../../middlewares/tryCatch'
import { validate } from '../../middlewares/validate'

export const todoRouter = express.Router()

todoRouter.get(
  '/',
  authenticate,
  tryCatch(TodosController.getTodos)
)
todoRouter.get(
  '/:id',
  authenticate,
  validate(todoSchema),
  tryCatch(TodosController.getTodo)
)
todoRouter.post(
  '/',
  authenticate,
  validate(postTodoSchema),
  tryCatch(TodosController.postTodo)
)
todoRouter.delete(
  '/:id',
  authenticate,
  validate(todoSchema),
  tryCatch(TodosController.deleteTodo)
)
todoRouter.patch(
  '/:id',
  authenticate,
  validate(patchTodoSchema),
  tryCatch(TodosController.updateTodo)
)

/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { TodosController } from '../../controllers/todos/xindex'
import { tryCatch } from '../../helpers/errors/tryCatch'
import { authenticate } from '../../helpers/middlewares/authenticate'

export const todoRouter = express.Router()

todoRouter.get('/', tryCatch(TodosController.getTodos))
todoRouter.get('/:id', authenticate, tryCatch(TodosController.getTodo))
todoRouter.post('/', authenticate, tryCatch(TodosController.postTodo))
todoRouter.delete('/:id', authenticate, tryCatch(TodosController.deleteTodo))
todoRouter.patch('/:id', authenticate, tryCatch(TodosController.updateTodo))

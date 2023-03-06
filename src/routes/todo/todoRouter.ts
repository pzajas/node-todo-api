/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { TodosController } from '../../controllers/todos/xindex'
import { catchAsyncErrors } from '../../helpers/errors/catchAsyncErrors'
import { authenticate } from '../../helpers/middlewares/auth/authenticate'

export const todoRouter = express.Router()

todoRouter.get('/', catchAsyncErrors(TodosController.getTodos))
todoRouter.get('/:id', authenticate, catchAsyncErrors(TodosController.getTodo))
todoRouter.post('/', authenticate, catchAsyncErrors(TodosController.postTodo))
todoRouter.delete('/:id', authenticate, catchAsyncErrors(TodosController.deleteTodo))
todoRouter.patch('/:id', authenticate, catchAsyncErrors(TodosController.updateTodo))

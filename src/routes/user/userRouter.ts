/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { UserController } from '../../controllers/user/xindex'
import { catchAsyncErrors } from '../../helpers/errors/catchAsyncErrors'
import { authenticate } from '../../helpers/middlewares/auth/authenticate'

export const userRouter = express.Router()

userRouter.get('/', authenticate, catchAsyncErrors(UserController.getUsers))

userRouter.get('/:id', authenticate, catchAsyncErrors(UserController.getUser))

userRouter.patch('/:id', authenticate, catchAsyncErrors(UserController.updateUser))

userRouter.delete('/:id', authenticate, catchAsyncErrors(UserController.deleteUser))

/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { UserController } from '../../controllers/user/xindex'
import { tryCatch } from '../../helpers/errors/tryCatch'
import { authenticate } from '../../helpers/middlewares/authenticate'

export const userRouter = express.Router()

userRouter.get('/', authenticate, tryCatch(UserController.getUsers))

userRouter.get('/:id', authenticate, tryCatch(UserController.getUser))

userRouter.patch('/:id', authenticate, tryCatch(UserController.updateUser))

userRouter.delete('/:id', authenticate, tryCatch(UserController.deleteUser))

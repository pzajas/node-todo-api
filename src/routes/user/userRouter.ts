/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { authToken } from '../../controllers/auth/authController'
import { UserController } from '../../controllers/user/userController'

export const userRouter = express.Router()

userRouter.get('/', authToken, UserController.getUsers)

userRouter.post('/', UserController.postUser)

userRouter.get('/:id', UserController.getUser)

userRouter.patch('/:id', UserController.updateUser)

userRouter.delete('/:id', UserController.deleteUser)

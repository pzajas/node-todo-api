/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { authenticateUser } from '../../controllers/auth/authController'
import { UserController } from '../../controllers/user/userController'

export const userRouter = express.Router()

userRouter.get('/', authenticateUser, UserController.getUsers)

userRouter.post('/', authenticateUser, UserController.postUser)

userRouter.get('/:id', authenticateUser, UserController.getUser)

userRouter.patch('/:id', authenticateUser, UserController.updateUser)

userRouter.delete('/:id', authenticateUser, UserController.deleteUser)

/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { AuthController } from '../../controllers/auth/index'
import { authenticate } from '../../middlewares/auth/authenticate'

export const authRouter = express.Router()

authRouter.post('/register', AuthController.register)

authRouter.post('/login', AuthController.login)

authRouter.post('/refresh', AuthController.refresh)

authRouter.post('/logout', authenticate, AuthController.logout)

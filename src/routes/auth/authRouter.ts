/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { AuthController } from '../../controllers/auth/authController'

export const authRouter = express.Router()

authRouter.post('/login', AuthController.login)

authRouter.post('/logout', AuthController.logout)

authRouter.post('/register', AuthController.register)

authRouter.post('/refresh', AuthController.refresh)

/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { AuthController } from '../../controllers/auth/index'
import { catchAsyncErrors } from '../../helpers/errors/catchAsyncErrors'
import { authenticate } from '../../helpers/middlewares/auth/authenticate'

export const authRouter = express.Router()

authRouter.post('/register', catchAsyncErrors(AuthController.register))

authRouter.post('/login', catchAsyncErrors(AuthController.login))

authRouter.post('/refresh', catchAsyncErrors(AuthController.refresh))

authRouter.post('/logout', authenticate, catchAsyncErrors(AuthController.logout))

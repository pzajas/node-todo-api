/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { AuthController } from '../../controllers/auth/xindex'
import { tryCatch } from '../../helpers/errors/tryCatch'
import { authenticate } from '../../helpers/middlewares/authenticate'
import { validate } from '../../helpers/middlewares/validate'
import { loginSchema, refreshSchema, registerSchema } from '../../helpers/schemas/authSchemas'

export const authRouter = express.Router()

authRouter.post('/register', validate(registerSchema), tryCatch(AuthController.register))

authRouter.post('/login', validate(loginSchema), tryCatch(AuthController.login))

authRouter.post('/refresh', validate(refreshSchema), tryCatch(AuthController.refresh))

authRouter.post('/logout', authenticate, tryCatch(AuthController.logout))

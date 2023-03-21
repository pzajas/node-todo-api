/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { AuthController } from '../../controllers/auth/xindex'
import { authenticate } from '../../middlewares/authenticate'
import { tryCatch } from '../../middlewares/tryCatch'
import { validate } from '../../middlewares/validate'
import {
  loginSchema,
  refreshSchema,
  registerSchema,
} from '../../validation/schemas/authSchemas'

export const authRouter = express.Router()

authRouter.post(
  '/register',
  validate(registerSchema),
  tryCatch(AuthController.register)
)

authRouter.post(
  '/login',
  validate(loginSchema),
  tryCatch(AuthController.login)
)

authRouter.post(
  '/refresh',
  validate(refreshSchema),
  tryCatch(AuthController.refresh)
)

authRouter.post(
  '/logout',
  authenticate,
  tryCatch(AuthController.logout)
)

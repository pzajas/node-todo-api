import { Router } from 'express'

import { loginRouter } from './loginRouter'
import { logoutRouter } from './logoutRouter'
import { registerRouter } from './registerRouter'

const authRoutes = Router()

export const authRouters = [
  authRoutes.use('/login', loginRouter),
  authRoutes.use('/logout', logoutRouter),
  authRoutes.use('/register', registerRouter)
]

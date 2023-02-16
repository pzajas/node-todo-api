import { Router } from 'express'

import { authenticateUser } from '../controllers/auth/authController'
import { authRouter } from './auth/authRouter'
import { userRouter } from './user/userRouter'

const rootRouter = Router()

rootRouter.use('/', authRouter)
rootRouter.use('/users', authenticateUser, userRouter)

export default rootRouter

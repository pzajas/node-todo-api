import { Router } from 'express'

import { authRouter } from './auth/authRouter'
import { userRouter } from './user/userRouter'

const rootRouter = Router()

rootRouter.use('/', authRouter)
rootRouter.use('/users', userRouter)

export default rootRouter

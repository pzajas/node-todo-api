import { Router } from 'express'

import { authRouter } from './auth/authRouter'
import { todoRouter } from './todo/todoRouter'
import { userRouter } from './user/userRouter'

const rootRouter = Router()

rootRouter.use('/', authRouter)
rootRouter.use('/users', userRouter)
rootRouter.use('/todos', todoRouter)

export default rootRouter

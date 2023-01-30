import combineRouters from 'koa-combine-routers'

import { authRoutes } from './auth/index'
import { todoRoutes } from './todo/index'

export const router = combineRouters(
  ...authRoutes,
  ...todoRoutes
)

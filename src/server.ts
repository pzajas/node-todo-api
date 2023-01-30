import Koa from 'koa'

import { router } from './routes/routes'

const app = new Koa()

app.use(router())

app.listen(3000)

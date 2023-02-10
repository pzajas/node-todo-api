import express from 'express'

import rootRouter from './routes'

const app = express()

app.use('/', rootRouter)

app.listen(4000, () => 'server runs on 3000')

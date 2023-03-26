import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'

import { authenticate } from './middlewares/authenticate'
import { errorHandler } from './middlewares/errorHandler'
import rootRouter from './routes'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/', rootRouter)
app.use(bodyParser.json())
app.use('/logout', authenticate)
app.use('*', errorHandler)

app.listen(3000, () => 'server runs on 3000')

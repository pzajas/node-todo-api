import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'

import rootRouter from './routes'

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/', rootRouter)

app.listen(3000, () => 'server runs on 3000')

import express from 'express'

import { loginRouter } from './routes/auth/loginRouter'
import { logoutRouter } from './routes/auth/logoutRouter'
import { registerRouter } from './routes/auth/registerRouter'

const app = express()

app.get('/', (req: any, res: any) => {
  res.render('index.ejs')
})

app.use('/', loginRouter)
app.use('/', logoutRouter)
app.use('/', registerRouter)

app.listen(3000, () => 'server runs on 3000')

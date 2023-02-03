import express from 'express'

export const loginRouter = express.Router()

loginRouter.route('/login').get((req: any, res: any) => {
  res.render('login.ejs')
})

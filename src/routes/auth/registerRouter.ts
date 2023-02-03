import express from 'express'

export const registerRouter = express.Router()

registerRouter.route('/register').get((req: any, res: any) => {
  res.render('register.ejs')
})

import express from 'express'

export const logoutRouter = express.Router()

logoutRouter.route('/logout').get((req: any, res: any) => {
  res.render('dash.ejs')
})

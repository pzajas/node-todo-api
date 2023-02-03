import express from 'express'

export const logoutRouter = express.Router()

logoutRouter.route('/logout').post((req: any, res: any) => {
  res.status(200).send({
    message: 'status ok'
  })
})

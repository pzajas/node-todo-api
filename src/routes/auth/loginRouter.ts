import express from 'express'

export const loginRouter = express.Router()

loginRouter.route('/login').post((req: any, res: any) => {
  res.status(200).send({
    message: 'status ok'
  })
})

import express from 'express'

export const registerRouter = express.Router()

registerRouter.route('/logout').post((req: any, res: any) => {
  res.status(200).send({
    message: 'status ok'
  })
})

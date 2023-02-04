import express, { type Request, type Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as UserService from '../../services/userService'

export const userRouter = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await UserService.listUsers()
    return res.status(200).json(users)
  } catch (error: any) {
    return res.status(500).json(error.message)
  }
})

userRouter.post('/', body('username').isString(), body('password').isString(), body('email').isString(),
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array() })
    }

    try {
      const user = req.body

      const newUser = await UserService.createUser(user)
      return res.status(200).json(newUser)
    } catch (error: any) {
      return res.status(500).json(error.message)
    }
  })

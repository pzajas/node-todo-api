/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import { AuthController } from '../../controllers/auth/index'
import { HTTP_CODES, HTTP_STATUSES } from '../../interfaces/Responses/HTTP'
import { authenticate } from '../../middlewares/auth/authenticate'

export const authRouter = express.Router()

// const catchAsyncErrors = (func: any) => async (req: any, res: any, next: any) =>
//   await Promise.resolve(func(req, res, next)).catch((err) => {
//     console.log('error', err)
//     next()
//   })

function catchAsyncErrors (fn: any) {
  return async function (req: any, res: any, next: any) {
    try {
      await fn(req, res, next)
    } catch (error) {
      return res.status(HTTP_CODES.UNAUTHORIZED).json({ ...HTTP_STATUSES.UNAUTHORIZED })
    } finally {
      next()
    }
  }
}

authRouter.post('/register', catchAsyncErrors(AuthController.register))

authRouter.post('/login', catchAsyncErrors(AuthController.login))

authRouter.post('/refresh', authenticate, catchAsyncErrors(AuthController.refresh))

authRouter.post('/logout', authenticate, catchAsyncErrors(AuthController.logout))

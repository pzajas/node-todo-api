import { type NextFunction, type Request, type Response } from 'express'

import { HTTP_CODES } from '../interfaces/http/http'

export const validate = (schema: any) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await schema.validate((req.body), { abortEarly: false })

      next()
    } catch (error: any) {
      const firstError = error.errors[0]

      if (error !== null) {
        return res.status(HTTP_CODES.BAD_REQUEST).json({ status: 400, message: firstError })
      }
    }
  }

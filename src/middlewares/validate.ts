import {
  type NextFunction,
  type Request,
  type Response,
} from 'express'

import { HTTP_CODES } from '../libs/http'
import { VALIDATION_ERRORS } from '../validation/messages/validation'

let errorMessage: string

export const validate =
  (schema: any) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { abortEarly: false, strict: true }
      )

      next()
    } catch (error: any) {
      const firstError = error.errors[0]
      const todoId = error.value.params.id

      if (todoId !== undefined && isNaN(todoId)) {
        errorMessage = VALIDATION_ERRORS.SHOULD_BE_NUMBER
      } else {
        errorMessage = firstError
      }

      return res.status(HTTP_CODES.BAD_REQUEST).json({
        status: HTTP_CODES.BAD_REQUEST,
        message: errorMessage,
      })
    }
  }

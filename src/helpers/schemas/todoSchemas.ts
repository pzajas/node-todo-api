import { number, object, string } from 'yup'

import { HTTP_ERRORS } from '../interfaces/http/http'

export const todoSchema = object({
  params: object({
    id: number().required()
  })
})

export const postTodoSchema = object({
  body: object({
    value: string().typeError(HTTP_ERRORS.IS_STRING).trim().min(5, HTTP_ERRORS.TODO_MIN_LENGTH).max(50, HTTP_ERRORS.TODO_MAX_LENGTH).required(HTTP_ERRORS.TODO_IS_REQUIRED)
  })
})

export const patchTodoSchema = object({
  params: object({
    id: number().typeError('pp').required()
  }),
  body: object({
    value: string().typeError(HTTP_ERRORS.IS_STRING).trim().min(5, HTTP_ERRORS.TODO_MIN_LENGTH).max(50, HTTP_ERRORS.TODO_MAX_LENGTH).required(HTTP_ERRORS.TODO_IS_REQUIRED)
  })
})

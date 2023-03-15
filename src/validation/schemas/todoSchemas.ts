import { number, object, string } from 'yup'

import { VALIDATION_ERRORS } from '../messages/validation'

export const todoSchema = object({
  params: object({
    id: number().required()
  })
})

export const postTodoSchema = object({
  body: object({
    value: string().typeError(VALIDATION_ERRORS.IS_STRING).trim().min(5, VALIDATION_ERRORS.TODO_MIN_LENGTH).max(50, VALIDATION_ERRORS.TODO_MAX_LENGTH).required(VALIDATION_ERRORS.TODO_IS_REQUIRED)
  })
})

export const patchTodoSchema = object({
  params: object({
    id: number().typeError('pp').required()
  }),
  body: object({
    value: string().typeError(VALIDATION_ERRORS.IS_STRING).trim().min(5, VALIDATION_ERRORS.TODO_MIN_LENGTH).max(50, VALIDATION_ERRORS.TODO_MAX_LENGTH).required(VALIDATION_ERRORS.TODO_IS_REQUIRED)
  })
})

import { object, string } from 'yup'

import { VALIDATION_ERRORS } from '../messages/validation'

export const todoSchema = object({
  params: object({
    id: string().required(),
  }),
})

export const postTodoSchema = object({
  body: object({
    value: string()
      .typeError(VALIDATION_ERRORS.SHOULD_BE_STRING)
      .trim(VALIDATION_ERRORS.VALUE_SHOULD_BE_TRIMMED)
      .min(5, VALIDATION_ERRORS.TODO_MIN_LENGTH)
      .max(50, VALIDATION_ERRORS.TODO_MAX_LENGTH)
      .required(VALIDATION_ERRORS.TODO_IS_REQUIRED),
  }),
})

export const patchTodoSchema = object({
  params: object({
    id: string().typeError('pp').required(),
  }),
  body: object({
    value: string()
      .typeError(VALIDATION_ERRORS.SHOULD_BE_STRING)
      .trim()
      .min(5, VALIDATION_ERRORS.TODO_MIN_LENGTH)
      .max(50, VALIDATION_ERRORS.TODO_MAX_LENGTH)
      .required(VALIDATION_ERRORS.TODO_IS_REQUIRED),
  }),
})

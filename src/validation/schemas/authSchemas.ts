import { object, string } from 'yup'

import { VALIDATION_ERRORS } from '../messages/validation'

export const registerSchema = object({
  body: object({
    username: string().trim().min(5, VALIDATION_ERRORS.USERNAME_MIN_LENGTH).max(20, VALIDATION_ERRORS.USERNAME_MAX_LENGTH).required(VALIDATION_ERRORS.USERNAME_IS_REQUIRED),
    password: string().trim().min(5, VALIDATION_ERRORS.PASSWORD_MIN_LENGTH).max(20, VALIDATION_ERRORS.PASSWORD_MAX_LENGTH).required(VALIDATION_ERRORS.PASSWORD_IS_REQUIRED),
    email: string().trim().min(5, VALIDATION_ERRORS.EMAIL_MIN_LENGTH).max(20, VALIDATION_ERRORS.EMAIL_MAX_LENGTH).email(VALIDATION_ERRORS.IS_EMAIL).required(VALIDATION_ERRORS.EMAIL_IS_REQUIRED)
  })
})

export const loginSchema = object({
  body: object({
    username: string().typeError(VALIDATION_ERRORS.IS_STRING).trim().required(VALIDATION_ERRORS.USERNAME_IS_REQUIRED),
    password: string().trim(VALIDATION_ERRORS.IS_STRING).required(VALIDATION_ERRORS.PASSWORD_IS_REQUIRED)
  })
})

export const refreshSchema = object({
  body: object({
    refreshToken: string().trim().min(1, VALIDATION_ERRORS.REFRESH_MIN_LENGTH).required(VALIDATION_ERRORS.REFRESH_IS_REQUIRED)
  })
})

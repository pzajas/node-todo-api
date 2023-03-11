import { object, string } from 'yup'

import { HTTP_ERRORS } from '../interfaces/http/http'

export const registerSchema = object({
  username: string().trim().min(5, HTTP_ERRORS.USERNAME_MIN_LENGTH).max(20, HTTP_ERRORS.USERNAME_MAX_LENGTH).required(HTTP_ERRORS.USERNAME_IS_REQUIRED),
  password: string().trim().min(5, HTTP_ERRORS.PASSWORD_MIN_LENGTH).max(20, HTTP_ERRORS.PASSWORD_MAX_LENGTH).required(HTTP_ERRORS.PASSWORD_IS_REQUIRED),
  email: string().trim().min(5, HTTP_ERRORS.EMAIL_MIN_LENGTH).max(20, HTTP_ERRORS.EMAIL_MAX_LENGTH).email(HTTP_ERRORS.EMAIL_IS_VALID).required(HTTP_ERRORS.EMAIL_IS_REQUIRED)
})

export const loginSchema = object({
  username: string().required(HTTP_ERRORS.USERNAME_IS_REQUIRED),
  password: string().required(HTTP_ERRORS.PASSWORD_IS_REQUIRED)
})

export const refreshSchema = object({
  refreshToken: string().required()
})

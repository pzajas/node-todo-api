import { object, string } from 'yup'

import { VALIDATION_ERRORS } from '../messages/validation'

export const registerSchema = object({
  body: object({
    username: string()
      .trim('Property username should be a trimmed string.')
      .min(5, VALIDATION_ERRORS.USERNAME_MIN_LENGTH)
      .max(20, VALIDATION_ERRORS.USERNAME_MAX_LENGTH)
      .required(VALIDATION_ERRORS.USERNAME_IS_REQUIRED),
    password: string()
      .trim('Property password should be a trimmed string.')
      .min(5, VALIDATION_ERRORS.PASSWORD_MIN_LENGTH)
      .max(20, VALIDATION_ERRORS.PASSWORD_MAX_LENGTH)
      .required(VALIDATION_ERRORS.PASSWORD_IS_REQUIRED),
    email: string()
      .trim()
      .min(5, VALIDATION_ERRORS.EMAIL_MIN_LENGTH)
      .max(20, VALIDATION_ERRORS.EMAIL_MAX_LENGTH)
      .email(VALIDATION_ERRORS.SHOULD_BE_EMAIL)
      .required(VALIDATION_ERRORS.EMAIL_IS_REQUIRED),
  }),
})

export const loginSchema = object({
  body: object({
    username: string()
      .trim(VALIDATION_ERRORS.USERNAME_SHOULD_BE_TRIMMED)
      .typeError(
        VALIDATION_ERRORS.USERNAME_SHOULD_BE_STRING
      )
      .required(VALIDATION_ERRORS.USERNAME_IS_REQUIRED),
    password: string()
      .trim(VALIDATION_ERRORS.PASSWORD_SHOULD_BE_TRIMMED)
      .typeError(
        VALIDATION_ERRORS.PASSWORD_SHOULD_BE_STRING
      )
      .required(VALIDATION_ERRORS.PASSWORD_IS_REQUIRED),
  }),
})

export const refreshSchema = object({
  body: object({
    refreshToken: string()
      .trim()
      .min(1, VALIDATION_ERRORS.REFRESH_MIN_LENGTH)
      .required(VALIDATION_ERRORS.REFRESH_IS_REQUIRED),
  }),
})

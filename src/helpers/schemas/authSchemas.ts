import { object, string } from 'yup'

const usernameMinLengthError = 'Property username must be at least 5 characters'
const passwordMinLengthError = 'Property password must be at least 5 characters'

const usernameMaxLengthError = 'Property username must be at most 12 characters'
const passwordMaxLengthError = 'Property password must be at most 12 characters'

// const refreshLengthError = 'Property refreshToken must be at exactly 137 characters'

const emailValidationError = 'Property email must be a valid email'

export const registerSchema = object({
  username: string().min(5, usernameMinLengthError).max(12, usernameMaxLengthError).required(),
  password: string().min(5, passwordMinLengthError).max(12, passwordMaxLengthError).required(),
  email: string().email(emailValidationError).required()
})

export const loginSchema = object({
  username: string().required(),
  password: string().required()
})

export const refreshSchema = object({
  refreshToken: string().required()
})

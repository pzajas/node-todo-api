export const VALIDATION_ERRORS = {
  REGISTER: 'Something went wrong during the registration process.',
  LOGIN: 'Something went wrong during the login process.',
  REFRESH: 'Something went wrong during the refresh token process.',
  LOGOUT: 'Something went wrong during the logout process.',

  USERNAME_MIN_LENGTH: 'Property username must be at least 5 characters.',
  USERNAME_MAX_LENGTH: 'Property username must be at most 20 characters.',
  USERNAME_IS_REQUIRED: 'Property username is a required field.',

  PASSWORD_MIN_LENGTH: 'Property password must be at least 5 characters.',
  PASSWORD_MAX_LENGTH: 'Property password must be at most 20 characters.',
  PASSWORD_IS_REQUIRED: 'Property password is a required field.',

  EMAIL_MIN_LENGTH: 'Property email must be at least 5 characters.',
  EMAIL_MAX_LENGTH: 'Property email must be at most 20 characters.',
  EMAIL_IS_REQUIRED: 'Property email is a required field.',

  TODO_MIN_LENGTH: 'Property value must be at least 5 characters.',
  TODO_MAX_LENGTH: 'Property value must be at most 50 characters.',
  TODO_IS_REQUIRED: 'Property value is a required field.',

  REFRESH_MIN_LENGTH: 'Property refreshToken cannot be an empty string.',
  REFRESH_MAX_LENGTH: 'Property refreshToken must be at most 20 characters.',
  REFRESH_IS_REQUIRED: 'Property refreshToken is a required field.',

  IS_NUMBER: 'Property :id should be a number.',
  IS_STRING: 'Property value should be a string.',
  IS_EMAIL: 'Property email must be a valid email',

  // TODOS

  TODO_IS_NULL: 'The record you are looking for is not there.',
  USER_IS_UNAUTHORIZED: 'You are not authorized to perform this action.',

  // ID

  PARAM_MUST_BE_A_NUMBER: 'Parameter :id must be a number.'
}

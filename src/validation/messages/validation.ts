export const VALIDATION_ERRORS = {
  // REGISTER
  REGISTER:
    'Something went wrong during the registration process.',
  // LOGIN
  LOGIN: 'You have provided a wrong username or password.',
  // REFRESH
  REFRESH:
    'Something went wrong during the refresh token process.',
  // LOGOUT
  LOGOUT: 'Something went wrong during the logout process.',

  // USER
  USER_IS_TAKEN: 'The user already exists.',
  USER_IS_UNAUTHORIZED:
    'You are not authorized to perform this action.',

  // TODO

  TODO_NOT_FOUND: 'The todo was not found.',
  TODO_ALREADY_EXISTS: 'The todo is already on the list.',
  TODO_ID_NOT_PROVIDED:
    'You must provide the id of todo you want to interact with.',
  TODO_LIST_IS_EMPTY:
    'You do not have any todos added yet.',
  VALUE_SHOULD_BE_TRIMMED:
    'Property value should be trimmed.',

  USERNAME_MIN_LENGTH:
    'Property username must be at least 5 characters.',
  USERNAME_MAX_LENGTH:
    'Property username must be at most 20 characters.',
  USERNAME_IS_REQUIRED:
    'Property username is a required field.',
  USERNAME_SHOULD_BE_STRING:
    'Property username should be a string.',
  USERNAME_SHOULD_BE_TRIMMED:
    'Property username should be a trimmed string.',

  PASSWORD_MIN_LENGTH:
    'Property password must be at least 5 characters.',
  PASSWORD_MAX_LENGTH:
    'Property password must be at most 20 characters.',
  PASSWORD_IS_REQUIRED:
    'Property password is a required field.',
  PASSWORD_SHOULD_BE_STRING:
    'Property password should be a string.',
  PASSWORD_SHOULD_BE_TRIMMED:
    'Property password should be a trimmed string.',

  EMAIL_MIN_LENGTH:
    'Property email must be at least 5 characters.',
  EMAIL_MAX_LENGTH:
    'Property email must be at most 20 characters.',
  EMAIL_IS_REQUIRED: 'Property email is a required field.',
  EMAIL_SHOULD_BE_TRIMMED:
    'Property email should be a trimmed string.',

  REFRESH_MIN_LENGTH:
    'Property refreshToken cannot be an empty string.',
  REFRESH_MAX_LENGTH:
    'Property refreshToken must be at most 20 characters.',
  REFRESH_IS_REQUIRED:
    'Property refreshToken is a required field.',
  REFRESH_SHOULD_BE_STRING:
    'Property refreshToken should be a string.',
  REFRESH_SHOULD_BE_TRIMMED:
    'Property refreshToken should be a trimmed string.',

  TODO_MIN_LENGTH:
    'Property value must be at least 5 characters.',
  TODO_MAX_LENGTH:
    'Property value must be at most 50 characters.',
  TODO_IS_REQUIRED: 'Property value is a required field.',

  SHOULD_BE_NUMBER: 'Property :id should be a number.',
  SHOULD_BE_STRING: 'Property value should be a string.',
  SHOULD_BE_EMAIL: 'Property email must be a valid email',

  PARAM_MUST_BE_A_NUMBER: 'Parameter :id must be a number.',

  TODO_IS_NULL:
    'The record you are looking for is not there.',
}

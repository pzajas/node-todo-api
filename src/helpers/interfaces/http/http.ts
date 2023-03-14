export const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
}

export const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
}

export const HTTP_MESSAGES = {
  OK: 'The user has successfully performed an action',
  CREATED: 'The record was successfully created and added to the database',
  DELETED: 'The record was successfully deleted and removed from the database',
  BAD_REQUEST: 'bad request',
  UNAUTHORIZED: 'unauthorized',
  FORBIDDEN: 'forbidden',
  NOT_FOUND: 'not found',
  INTERNAL_ERROR: 'internal server error'
}

export const HTTP_ERRORS = {
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

export const HTTP_STATUSES = {
  OK: { status: HTTP_CODES.OK, message: HTTP_MESSAGES.OK },
  CREATED: { status: HTTP_CODES.CREATED, message: HTTP_MESSAGES.CREATED },
  BAD_REQUEST: { status: HTTP_CODES.BAD_REQUEST, message: HTTP_MESSAGES.BAD_REQUEST },
  UNAUTHORIZED: { status: HTTP_CODES.UNAUTHORIZED, message: HTTP_MESSAGES.UNAUTHORIZED },
  FORBIDDEN: { status: HTTP_CODES.FORBIDDEN, message: HTTP_MESSAGES.FORBIDDEN },
  NOT_FOUND: { status: HTTP_CODES.NOT_FOUND, message: HTTP_MESSAGES.NOT_FOUND },
  INTERNAL_ERROR: { status: HTTP_CODES.INTERNAL_ERROR, message: HTTP_MESSAGES.INTERNAL_ERROR }
}

export const HTTP_URLS = {
  REGISTER: 'http://localhost:3000/register',
  LOGIN: 'http://localhost:3000/login',
  REFRESH: 'http://localhost:3000/refresh',
  LOGOUT: 'http://localhost:3000/logout',

  TODOS: 'http://localhost:3000/todos',
  TODOS_ID: 'http://localhost:3000/todos/:id',

  USERS: 'http://localhost:3000/users'
}

export const HTTP_TYPES = {
  STRING: 'string',
  NUMBER: 'number'
}

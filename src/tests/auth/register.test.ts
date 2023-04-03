import axios from 'axios'
import dotenv from 'dotenv'

import { createUser } from '../../services/userService/createUser'
import { deleteUsers } from '../../helpers/functions/authentication/deleteUsers'
import { env } from 'process'
import { expect } from 'chai'

import { VALIDATION_ERRORS } from '../../validation/messages/validation'

import {
  HTTP_CODES,
  HTTP_MESSAGES,
  HTTP_METHODS,
  HTTP_URLS,
} from '../../libs/http'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD
const email = env.EMAIL

const uniqueUsername = 'Hajime'
const uniqeEmail = 'Hajime@gmail.com'

const lengthyUsername =
  'thisUsernameIsTooLongForTheDatabase'
const lengthyPassword =
  'thisPasswordIsTooLongForTheDatabase'
const lengthyEmail = 'verylongemai.@gmail.com'

describe('user registers successfully', () => {
  beforeEach(async () => {
    await deleteUsers()
  })

  it('should register the user when valid credentials are provided', async () => {
    const res = await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        password,
        email,
      },
    })

    expect(res.data.message).eq(HTTP_MESSAGES.CREATED)
    expect(res.data.status).eq(HTTP_CODES.CREATED)
  })
})

describe('user tries to register providing an existing username', () => {
  beforeEach(async () => {
    await deleteUsers()
    await createUser(username, password, email)
  })
  it('should expect an error when an existing username is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        password,
        email: uniqeEmail,
      },
    }).catch((err) => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.CONFLICT)
      expect(response.message).eq(
        VALIDATION_ERRORS.USER_IS_TAKEN
      )
    })
  })
})

describe('user tries to register providing an existing email', () => {
  beforeEach(async () => {
    await deleteUsers()
    await createUser(username, password, email)
  })
  it('should expect an error when an existing email is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username: uniqueUsername,
        password,
        email,
      },
    }).catch((err) => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.CONFLICT)
      expect(response.message).eq(
        VALIDATION_ERRORS.USER_IS_TAKEN
      )
    })
  })
})

describe('user tries to register providing an invalid username', () => {
  it('should expect an error when an empty username is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username: '',
        password,
        email,
      },
    }).catch((err) => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(
        VALIDATION_ERRORS.USERNAME_MIN_LENGTH
      )
    })
  })

  it('should expect an error when too long username is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username: lengthyUsername,
        password,
        email,
      },
    }).catch((err) => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(
        VALIDATION_ERRORS.USERNAME_MAX_LENGTH
      )
    })
  })

  it('should expect an error when no username is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        password,
        email,
      },
    }).catch((err) => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(
        VALIDATION_ERRORS.USERNAME_IS_REQUIRED
      )
    })
  })
})

describe('user tries to register providing an invalid password', () => {
  it('should expect an error when an empty password is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        password: '',
        email,
      },
    }).catch((err) => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(
        VALIDATION_ERRORS.PASSWORD_MIN_LENGTH
      )
    })
  })

  it('should expect an error when loo long password is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        password: lengthyPassword,
        email,
      },
    }).catch((err) => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(
        VALIDATION_ERRORS.PASSWORD_MAX_LENGTH
      )
    })
  })

  it('should expect an error when no password is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        email,
      },
    }).catch((err) => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(
        VALIDATION_ERRORS.PASSWORD_IS_REQUIRED
      )
    })
  })
})

describe('user tries to register providing an invalid email', () => {
  it('should expect an error when an empty email is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        password,
        email: '',
      },
    }).catch((err) => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(
        VALIDATION_ERRORS.EMAIL_MIN_LENGTH
      )
    })
  })

  it('should expect an error when an empty email is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        password,
        email: lengthyEmail,
      },
    }).catch((err) => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(
        VALIDATION_ERRORS.EMAIL_MAX_LENGTH
      )
    })
  })

  it('should expect an error when no email is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        password,
      },
    }).catch((err) => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(
        VALIDATION_ERRORS.EMAIL_IS_REQUIRED
      )
    })
  })
})

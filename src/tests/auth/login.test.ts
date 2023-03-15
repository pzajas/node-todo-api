import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { HTTP_CODES, HTTP_MESSAGES, HTTP_METHODS, HTTP_TYPES, HTTP_URLS } from '../../libs/http'
import { VALIDATION_ERRORS } from '../../validation/messages/validation'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD

const invalidUsername = 'invalid'
const invalidPassword = 'invalid'

describe('user logs in successfully', () => {
  it('should log in the user when valid credentials are provided', async () => {
    const res = await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        username,
        password
      }
    })

    expect(res.data.token).a(HTTP_TYPES.STRING)
    expect(res.data.refreshToken).a(HTTP_TYPES.STRING)

    expect(res.data.message).eq(HTTP_MESSAGES.OK)
    expect(res.data.status).eq(HTTP_CODES.OK)
  })
})

describe('user tries to log in providing invalid credentials', () => {
  it('should expect an error when invalid username and password are provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        username: invalidUsername,
        password: invalidPassword
      }

    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(VALIDATION_ERRORS.LOGIN)
    })
  })
})

describe('user tries to log in providing an invalid username', () => {
  it('should expect an error when an invalid username is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        username: invalidUsername,
        password
      }
    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(VALIDATION_ERRORS.LOGIN)
    })
  })

  it('should expect an error when an empty username is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        username: '',
        password
      }
    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(VALIDATION_ERRORS.USERNAME_IS_REQUIRED)
    })
  })

  it('should expect an error when no username is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        password
      }
    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(VALIDATION_ERRORS.USERNAME_IS_REQUIRED)
    })
  })
})

describe('user tries to log in providing an invalid password', () => {
  it('should expect an error when an invalid password is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        username,
        password: invalidPassword
      }

    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(VALIDATION_ERRORS.LOGIN)
    })
  })

  it('should expect an error when an empty password is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        username,
        password: ''
      }

    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(VALIDATION_ERRORS.PASSWORD_IS_REQUIRED)
    })
  })

  it('should expect an error when no password is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        username
      }

    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(response.message).eq(VALIDATION_ERRORS.PASSWORD_IS_REQUIRED)
    })
  })
})

import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { signIn } from '../../helpers/functions/authentication/signIn'
import { HTTP_CODES, HTTP_ERRORS, HTTP_MESSAGES, HTTP_METHODS, HTTP_URLS } from '../../helpers/interfaces/http/http'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD

const longString = 'longString'.repeat(10)

let token: string
const invalidToken = 'invalid'

describe('user creates a todo successfully', () => {
  beforeEach(async () => {
    const accessToken = await signIn(username, password)
    token = accessToken.token
  })

  it('should create a todo and save it to the database', async () => {
    const res = await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.TODOS,
      headers: {
        Cookie: `token=${token}`
      },
      data: {
        value: 'kotek mały'
      }
    })
    expect(res.data.message).eq(HTTP_MESSAGES.CREATED)
    expect(res.data.status).eq(HTTP_CODES.CREATED)
  })
})

describe('user tries to create a todo providing an invalid token', () => {
  it('should expect and error when an invalid token is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.TODOS,
      headers: {
        Cookie: `token=${invalidToken}`
      },
      data: {
        value: 'Sweet kitty'
      }
    }).catch(err => {
      const res = err.response.data

      expect(res.message).eq(HTTP_ERRORS.USER_IS_UNAUTHORIZED)
      expect(res.status).eq(HTTP_CODES.UNAUTHORIZED)
    })
  })

  it('should expect and error when an empty token is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.TODOS,
      headers: {
        Cookie: ''
      },
      data: {
        value: 'Sweet kitty'
      }
    }).catch(err => {
      const res = err.response.data

      expect(res.message).eq(HTTP_ERRORS.USER_IS_UNAUTHORIZED)
      expect(res.status).eq(HTTP_CODES.UNAUTHORIZED)
    })
  })

  it('should expect and error when no token is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.TODOS,
      data: {
        value: 'Sweet kitty'
      }
    }).catch(err => {
      const res = err.response.data

      expect(res.message).eq(HTTP_ERRORS.USER_IS_UNAUTHORIZED)
      expect(res.status).eq(HTTP_CODES.UNAUTHORIZED)
    })
  })
})

describe('user tries to create a todo providing an invalid value', () => {
  beforeEach(async () => {
    const accessToken = await signIn(username, password)
    token = accessToken.token
  })

  it('should expect and error when an empty value is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.TODOS,
      headers: {
        Cookie: `token=${token}`
      },
      data: {
        value: ''
      }
    }).catch(err => {
      const res = err.response.data
      expect(res.message).eq(HTTP_ERRORS.TODO_MIN_LENGTH)
      expect(res.status).eq(HTTP_CODES.BAD_REQUEST)
    })
  })

  it('should expect and error when too long value is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.TODOS,
      headers: {
        Cookie: `token=${token}`
      },
      data: {
        value: longString
      }
    }).catch(err => {
      const res = err.response.data
      expect(res.message).eq(HTTP_ERRORS.TODO_MAX_LENGTH)
      expect(res.status).eq(HTTP_CODES.BAD_REQUEST)
    })
  })

  it('should expect and error when no value is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.TODOS,
      headers: {
        Cookie: `token=${token}`
      }
    }).catch(err => {
      const res = err.response.data
      expect(res.message).eq(HTTP_ERRORS.TODO_IS_REQUIRED)
      expect(res.status).eq(HTTP_CODES.BAD_REQUEST)
    })
  })
})

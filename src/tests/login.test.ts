import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { HTTP_CODES, HTTP_MESSAGES, HTTP_METHODS, HTTP_URLS } from '../interfaces/Responses/HTTP'

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

    expect(res.data.username).a('string').eq(username)

    expect(res.data.token).a('string')
    expect(res.data.refreshToken).a('string')

    expect(res.data.message).eq('OK')
    expect(res.data.status).eq(200)
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

      if (username !== env.LOGIN && password !== env.PASSWORD) {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
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
      if (username !== env.LOGIN) {
        const response = err.response.data

        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
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
      if (username === '') {
        const response = err.response.data

        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
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

      if (username === null) {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
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

      if (password !== env.PASSWORD) {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
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
      if (password === '') {
        const response = err.response.data

        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })

  it('should expect an error when no password is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        password
      }
    }).catch(err => {
      if (password === null) {
        const response = err.response.data

        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })
})

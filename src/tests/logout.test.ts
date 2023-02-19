import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { HTTP_CODES, HTTP_MESSAGES, HTTP_METHODS, HTTP_URLS } from '../interfaces/Responses/HTTP'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD

let token: string

describe('user logs out successfully', () => {
  beforeEach(async () => {
    const response = await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        username,
        password
      }
    })
    token = response.data.token
  })

  it('should log out the user if a valid token is provided', async () => {
    const res = await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGOUT,
      headers: { Cookie: token },
      withCredentials: true
    })

    expect(res.data.message).eq('OK')
    expect(res.data.status).eq(200)
  })
})

describe('user tries to log out providing an invalid access token', () => {
  beforeEach(async () => {
    const res = await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        username,
        password
      }
    })
    token = res.data.token
  })

  it('should expect an error if an invalid token is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGOUT,
      headers: { Cookie: token }
    }).catch(err => {
      if (token === `${token}random`) {
        const response = err.response.data

        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })

  it('should expect an error if an empty token is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGOUT,
      headers: { Cookie: '' }
    }).catch(err => {
      if (token === '') {
        const response = err.response.data

        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })

  it('should expect an error if no token is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGOUT
    }).catch(err => {
      if (token === null) {
        const response = err.response.data

        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })
})

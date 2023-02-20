import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { HTTP_CODES, HTTP_MESSAGES, HTTP_METHODS, HTTP_URLS } from '../interfaces/Responses/HTTP'
import { signIn } from '../services/auth/signIn'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD

let refreshToken: string

describe('user refreshes the token successfully', () => {
  beforeEach(async () => {
    const response = await signIn(username, password)
    refreshToken = response.refreshToken
  })

  it('should provide a new access token to a logged user', async () => {
    const res = await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REFRESH,
      data: {
        refreshToken
      }

    })
    expect(res.data.message).eq(HTTP_MESSAGES.OK)
    expect(res.data.status).eq(HTTP_CODES.OK)
  })
})

describe('user tries to get a new token providing an invalid refresh token', () => {
  beforeEach(async () => {
    const response = await signIn(username, password)
    refreshToken = response.refreshToken
  })

  it('should expect an error if an invalid refresh token is provided', async () => {
    const invalidToken = `${refreshToken}random`

    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REFRESH,
      data: {
        refreshToken: invalidToken
      }

    }).catch(err => {
      const response = err.response.data

      if (invalidToken !== null) {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })

  it('should expect an error if an empty refresh token is provided', async () => {
    const invalidToken = ''

    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REFRESH,
      data: {
        refreshToken: invalidToken
      }

    }).catch(err => {
      const response = err.response.data

      if (invalidToken !== null) {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })

  it('should expect an error if no refresh token is provided', async () => {
    let refreshToken: string

    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REFRESH

    }).catch(err => {
      const response = err.response.data

      if (refreshToken !== null) {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })
})

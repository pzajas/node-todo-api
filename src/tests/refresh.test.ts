import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { HTTP_CODES, HTTP_MESSAGES, HTTP_METHODS, HTTP_URLS } from '../interfaces/Responses/HTTP'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD

let refreshToken: string = ''

describe('user refreshes the token successfully', () => {
  beforeEach(async () => {
    const response = await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        username,
        password
      }
    })
    refreshToken = response.data.refreshToken
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
    const response = await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGIN,
      data: {
        username,
        password
      }
    })
    refreshToken = response.data.refreshToken
  })

  it('should expect an error if an invalid refresh token is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REFRESH,
      data: {
        refreshToken: `${refreshToken}random`
      }

    }).catch(err => {
      const response = err.response.data

      if (refreshToken === `${refreshToken}random`) {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })

  it('should expect an error if an empty refresh token is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REFRESH,
      data: {
        refreshToken: ''
      }

    }).catch(err => {
      const response = err.response.data

      if (refreshToken === '') {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })

  it('should expect an error if no refresh token is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REFRESH
    }).catch(err => {
      const response = err.response.data

      if (refreshToken === null) {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })
})

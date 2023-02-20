import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { HTTP_CODES, HTTP_MESSAGES, HTTP_METHODS, HTTP_URLS } from '../interfaces/Responses/HTTP'
import { signIn } from '../services/auth/signIn'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD

let token: string

describe('user logs out successfully', () => {
  beforeEach(async () => {
    const response = await signIn(username, password)
    token = response.token
  })

  it('should log out the user if a valid token is provided', async () => {
    const res = await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGOUT,
      headers: { Cookie: token }
    })

    expect(res.data.message).eq(HTTP_MESSAGES.OK)
    expect(res.data.status).eq(HTTP_CODES.OK)
  })
})

describe('user tries to log out providing an invalid access token', () => {
  beforeEach(async () => {
    const response = await signIn(username, password)
    token = response.token
  })

  it('should expect an error if an invalid token is provided', async () => {
    const invalidToken = `${token}random`

    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGOUT,
      headers: { Cookie: invalidToken }

    }).catch(err => {
      const response = err.response.data

      if (invalidToken !== null) {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })

  it('should expect an error if an empty token is provided', async () => {
    const invalidToken = ''

    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGOUT,
      headers: { Cookie: invalidToken }

    }).catch(err => {
      const response = err.response.data

      if (invalidToken !== null) {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })

  it('should expect an error if no token is provided', async () => {
    let invalidToken: string

    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.LOGOUT

    }).catch(err => {
      const response = err.response.data

      if (invalidToken !== null) {
        expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
        expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
      }
    })
  })
})

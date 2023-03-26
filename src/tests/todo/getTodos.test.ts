import { env } from 'process'

import { expect } from 'chai'
import axios from 'axios'
import dotenv from 'dotenv'

import {
  HTTP_CODES,
  HTTP_MESSAGES,
  HTTP_METHODS,
  HTTP_URLS,
} from '../../libs/http'
import { VALIDATION_ERRORS } from '../../validation/messages/validation'
import { signIn } from '../../helpers/functions/authentication/signIn'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD

const invalidToken = 'invalidToken'

let token: string

describe('user gets the list of todos successfully', () => {
  beforeEach(async () => {
    const accessToken = await signIn(username, password)
    token = accessToken.token
  })

  it('should provide the user a list of their todos', async () => {
    const res = await axios({
      method: HTTP_METHODS.GET,
      url: HTTP_URLS.TODOS,
      headers: {
        Cookie: `token=${token}`,
      },
    })
    expect(res.data.todos).an('array').length.gte(0)

    expect(res.data.message).eq(HTTP_MESSAGES.OK)
    expect(res.data.status).eq(HTTP_CODES.OK)
  })
})

describe('user tries to get the list of todos when an invalid token is provided', () => {
  it('should expect an error when an invalid token is provided', async () => {
    await axios({
      method: HTTP_METHODS.GET,
      url: HTTP_URLS.TODOS,
      headers: {
        Cookie: `token=${invalidToken}`,
      },
    }).catch((err) => {
      const res = err.response.data

      expect(res.status).eq(HTTP_CODES.UNAUTHORIZED)
      expect(res.message).eq(
        VALIDATION_ERRORS.USER_IS_UNAUTHORIZED
      )
    })
  })
})

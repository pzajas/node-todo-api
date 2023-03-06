import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { signIn } from '../../helpers/functions/authentication/signIn'
import { HTTP_CODES, HTTP_MESSAGES, HTTP_METHODS, HTTP_URLS } from '../../helpers/interfaces/http/http'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD

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
        Cookie: `token=${token}`
      }
    })
    expect(res.data.todos).an('array')

    expect(res.data.message).eq(HTTP_MESSAGES.OK)
    expect(res.data.status).eq(HTTP_CODES.OK)
  })
})

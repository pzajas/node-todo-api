import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

dotenv.config()

describe('successful logout test', () => {
  const username = env.LOGIN
  const password = env.PASSWORD

  let token: string

  beforeEach(async () => {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: {
        username,
        password
      },
      withCredentials: true
    })
    token = response.data.token
  })

  it('should log out a logged user', async () => {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:3000/logout',
      headers: { Cookie: token },
      withCredentials: true
    })

    expect(res.data.message).eq('OK')
    expect(res.data.status).eq(200)
  })
})

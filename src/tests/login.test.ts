import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

dotenv.config()

describe('successful login test', () => {
  const username = env.LOGIN
  const password = env.PASSWORD

  it('should log in user when good credentials are provided', async () => {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:3000/login',
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

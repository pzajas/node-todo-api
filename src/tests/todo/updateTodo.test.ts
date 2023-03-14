import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { createTestTodo } from '../../helpers/functions/authentication/createTodo'
import { signIn } from '../../helpers/functions/authentication/signIn'
import { HTTP_CODES, HTTP_ERRORS, HTTP_MESSAGES, HTTP_METHODS } from '../../helpers/interfaces/http/http'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD

const invalidToken = 'invalid token'
const longString = 'longString'.repeat(10)

let token: string
let id: number

describe('user updates the todo successfully', () => {
  beforeEach(async () => {
    const accessToken = await signIn(username, password)
    token = accessToken.token

    id = await createTestTodo(token)
  })

  it('should provide the user a single todo', async () => {
    const res = await axios({
      method: HTTP_METHODS.PATCH,
      url: `http://localhost:3000/todos/${id}`,
      headers: {
        Cookie: `token=${token}`
      },
      data: {
        value: 'Updated Value'
      }
    })
    expect(res.data.message).eq(HTTP_MESSAGES.OK)
    expect(res.data.status).eq(HTTP_CODES.OK)
  })
})

describe('user tries to update a todo providing an invalid token', () => {
  beforeEach(async () => {
    const accessToken = await signIn(username, password)
    token = accessToken.token

    id = await createTestTodo(token)
  })
  it('should expect an error when an invalid token is provided', async () => {
    await axios({
      method: HTTP_METHODS.PATCH,
      url: `http://localhost:3000/todos/${id}`,
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

  it('should expect an error when an empty token is provided', async () => {
    await axios({
      method: HTTP_METHODS.PATCH,
      url: `http://localhost:3000/todos/${id}`,
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

  it('should expect an error when no token is provided', async () => {
    await axios({
      method: HTTP_METHODS.PATCH,
      url: `http://localhost:3000/todos/${id}`,
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

describe('user tries to update a todo providing an invalid value', () => {
  beforeEach(async () => {
    const accessToken = await signIn(username, password)
    token = accessToken.token

    id = await createTestTodo(token)
  })

  it('should expect an error when an empty value is provided', async () => {
    await axios({
      method: HTTP_METHODS.PATCH,
      url: `http://localhost:3000/todos/${id}`,
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

  it('should expect an error when too long value is provided', async () => {
    await axios({
      method: HTTP_METHODS.PATCH,
      url: `http://localhost:3000/todos/${id}`,

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

  it('should expect an error when no value is provided', async () => {
    await axios({
      method: HTTP_METHODS.PATCH,
      url: `http://localhost:3000/todos/${id}`,

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

import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { createTestTodo } from '../../helpers/functions/authentication/createTodo'
import { signIn } from '../../helpers/functions/authentication/signIn'
import {
  HTTP_CODES,
  HTTP_MESSAGES,
  HTTP_METHODS,
} from '../../libs/http'
import { VALIDATION_ERRORS } from '../../validation/messages/validation'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD

const invalidToken = 'invalidToken'
const invalidParameter = 'invalidParameter'

let token: string
let id: number

describe('user gets the single todo successfully', () => {
  beforeEach(async () => {
    const accessToken = await signIn(username, password)
    token = accessToken.token

    id = await createTestTodo(token)
  })
  it('should provide the user a single todo providing an invalid token', async () => {
    const res = await axios({
      method: HTTP_METHODS.GET,
      url: `http://localhost:3000/todos/${id}`,
      headers: {
        Cookie: `token=${token}`,
      },
    })
    const todo = res.data.todo

    expect(todo.id).a('number')
    expect(todo.value).a('string')
    expect(todo.completed).a('boolean')

    expect(res.data.message).eq(HTTP_MESSAGES.OK)
    expect(res.data.status).eq(HTTP_CODES.OK)
  })
})

describe('user tries to view a single todo providing an invalid access token', () => {
  beforeEach(async () => {
    const accessToken = await signIn(username, password)
    token = accessToken.token

    id = await createTestTodo(token)
  })
  it('should expect an error when an invalid token is provided', async () => {
    await axios({
      method: HTTP_METHODS.GET,
      url: `http://localhost:3000/todos/${id}`,
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

describe('user tries to view a single todo providing an invalid parameter', () => {
  beforeEach(async () => {
    const accessToken = await signIn(username, password)
    token = accessToken.token

    id = await createTestTodo(token)
  })
  it('should expect an error when an invalid parameter is provided', async () => {
    await axios({
      method: HTTP_METHODS.GET,
      url: `http://localhost:3000/todos/${invalidParameter}`,
      headers: {
        Cookie: `token=${token}`,
      },
    }).catch((err) => {
      const res = err.response.data

      expect(res.status).eq(HTTP_CODES.BAD_REQUEST)
      expect(res.message).eq(
        VALIDATION_ERRORS.SHOULD_BE_NUMBER
      )
    })
  })
})

import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { signIn } from '../../helpers/functions/authentication/signIn'
import { HTTP_CODES, HTTP_MESSAGES, HTTP_METHODS } from '../../helpers/interfaces/http/http'
import { userIdFromCookieToken } from '../../services/tokenService/getUserIdFromCookieToken'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD

const prisma = new PrismaClient()

let token: string
let id: number

describe('user gets the list of todos successfully', () => {
  beforeEach(async () => {
    const accessToken = await signIn(username, password)
    token = accessToken.token
  })

  it('should provide the user a single todo', async () => {
    const userId = await userIdFromCookieToken(token)

    const userTodo = await prisma.todo.findFirst({
      where: {
        userId
      }
    })
    if (userTodo !== null) { id = userTodo.id }

    const res = await axios({
      method: HTTP_METHODS.GET,
      url: `http://localhost:3000/todos/${id}`,
      headers: {
        Cookie: `token=${token}`
      }
    })
    const todo = res.data.todo

    expect(todo.id).a('number')
    expect(todo.value).a('string')
    expect(todo.completed).a('boolean')

    expect(res.data.message).eq(HTTP_MESSAGES.OK)
    expect(res.data.status).eq(HTTP_CODES.OK)
  })
})

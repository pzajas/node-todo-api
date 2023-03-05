import axios from 'axios'
import { expect } from 'chai'
import dotenv from 'dotenv'
import { env } from 'process'

import { HTTP_CODES, HTTP_MESSAGES, HTTP_METHODS, HTTP_URLS } from '../../helpers/interfaces/http/http'

dotenv.config()

const username = env.LOGIN
const password = env.PASSWORD
const email = env.EMAIL

// const invalidUsername = 'invalid'
// const invalidPassword = 'invalid'
// const invalidEmail = 'invalid'

describe('user registers successfully', () => {
  it('should register the user when valid credentials are provided', async () => {
    const res = await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        password,
        email
      }
    })
    expect(res.data.message).eq(HTTP_MESSAGES.CREATED)
    expect(res.data.status).eq(HTTP_CODES.CREATED)
  })
})

describe('user tries to register providing an invalid username', () => {
  // it('should expect an error when an invalid username is provided', async () => {
  //   await axios({
  //     method: HTTP_METHODS.POST,
  //     url: HTTP_URLS.REGISTER,
  //     data: {
  //       username: invalidUsername,
  //       password,
  //       email
  //     }
  //   })
  //     .catch(err => {
  //       const response = err.response.data

  //       expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
  //       expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
  //     })
  // })

  it('should expect an error when an empty username is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username: '',
        password,
        email
      }
    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
      expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
    })
  })

  it('should expect an error when no username is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        password,
        email
      }
    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
      expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
    })
  })
})

describe('user tries to register providing an invalid password', () => {
  // it('should expect an error when an invalid password is provided', async () => {
  //   await axios({
  //     method: HTTP_METHODS.POST,
  //     url: HTTP_URLS.REGISTER,
  //     data: {
  //       username,
  //       password: invalidPassword,
  //       email
  //     }

  //   }).catch(err => {
  //     const response = err.response.data

  //     expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
  //     expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
  //   })

  it('should expect an error when an empty password is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        password: '',
        email
      }

    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
      expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
    })
  })

  it('should expect an error when no password is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        email
      }

    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
      expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
    })
  })
})

describe('user tries to register providing an invalid email', () => {
//   it('should expect an error when an invalid email is provided', async () => {
//     await axios({
//       method: HTTP_METHODS.POST,
//       url: HTTP_URLS.REGISTER,
//       data: {
//         username,
//         password,
//         email: invalidEmail
//       }

  //     }).catch(err => {
  //       const response = err.response.data

  //       expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
  //       expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
  //     })
  //   })

  it('should expect an error when an empty email is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        password,
        email: ''
      }

    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
      expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
    })
  })

  it('should expect an error when no email is provided', async () => {
    await axios({
      method: HTTP_METHODS.POST,
      url: HTTP_URLS.REGISTER,
      data: {
        username,
        password
      }

    }).catch(err => {
      const response = err.response.data

      expect(response.status).eq(HTTP_CODES.UNAUTHORIZED)
      expect(response.message).eq(HTTP_MESSAGES.UNAUTHORIZED)
    })
  })
})

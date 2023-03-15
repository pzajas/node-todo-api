import axios from 'axios'

import { HTTP_METHODS, HTTP_URLS } from '../../../libs/http'

interface IResponse {
  token: string
  refreshToken: string
}

export const signIn = async (username: string, password: string): Promise<IResponse> => {
  const response = await axios({
    method: HTTP_METHODS.POST,
    url: HTTP_URLS.LOGIN,
    data: {
      username,
      password
    }
  })

  return {
    token: response.data.token,
    refreshToken: response.data.refreshToken
  }
}

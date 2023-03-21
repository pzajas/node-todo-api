import { LoginController as login } from './loginController'
import { LogoutController as logout } from './logoutController'
import { RefreshController as refresh } from './refreshController'
import { RegisterController as register } from './registerController'

export const AuthController = {
  register,
  login,
  refresh,
  logout,
}

import { deleteUserController as deleteUser } from './deleteUserController'
import { getUserController as getUser } from './getUserController'
import { getUsersController as getUsers } from './getUsersController'
import { updateUserController as updateUser } from './updateUserController'

export const UserController = {
  getUsers,
  getUser,
  deleteUser,
  updateUser
}

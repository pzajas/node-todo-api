import { type IMockUser } from '../../interface/interfaces'
import { createRandomEmail, createRandomName, createRandomPassword } from '../service/userService'

export const createRandomUser = (): IMockUser => {
  const randomName = createRandomName()
  const randomPass = createRandomPassword()
  const randomMail = createRandomEmail()

  const user = {
    username: randomName,
    email: randomMail,
    password: randomPass
  }

  return user
}

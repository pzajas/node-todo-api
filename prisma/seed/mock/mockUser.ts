import { createRandomName, createRandomPassword } from '../service/userService'

export const createRandomUser = (): any => {
  const randomName = createRandomName()
  const randomPass = createRandomPassword()

  const randomMail = `${randomName}@gmail.com`

  const user = {
    username: randomName,
    email: randomMail,
    password: randomPass
  }
  return user
}

import bcrypt from 'bcryptjs'

let hashedPassword: string

export const createHashedPassword = async (
  password: string
): Promise<string> => {
  hashedPassword = await bcrypt.hash(password, 10)

  return hashedPassword
}

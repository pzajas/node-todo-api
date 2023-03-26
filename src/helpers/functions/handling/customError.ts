interface ErrorWithStatus extends Error {
  status: number
}

export const customError = (
  status: number,
  message: string
): any => {
  const err = new Error() as ErrorWithStatus

  err.message = message
  err.status = status
  throw err
}

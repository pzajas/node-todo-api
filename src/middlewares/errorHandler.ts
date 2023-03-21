interface ErrorWithStatus extends Error {
  status: number
}

export const errorHandler = (
  error: ErrorWithStatus,
  _req: any,
  res: any,
  _next: any
): any => {
  console.log('LOG FROM ERR HANDLER')

  res
    .status(error.status)
    .json({ status: error.status, message: error.message })
}

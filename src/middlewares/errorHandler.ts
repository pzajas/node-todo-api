interface ErrorWithStatus extends Error {
  status: number
}

export const errorHandler = (
  error: ErrorWithStatus,
  _req: any,
  res: any,
  _next: any
): any => {
  res
    .status(error.status)
    .json({ status: error.status, message: error.message })
}

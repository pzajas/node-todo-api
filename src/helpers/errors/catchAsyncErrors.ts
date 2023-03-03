import { HTTP_CODES, HTTP_STATUSES } from '../interfaces/http/http'

export const catchAsyncErrors = (func: any) => {
  return async function (req: any, res: any, next: any) {
    try {
      await func(req, res, next)
    } catch (error) {
      return res.status(HTTP_CODES.UNAUTHORIZED).json({ ...HTTP_STATUSES.UNAUTHORIZED })
    } finally {
      next()
    }
  }
}

import {
  type NextFunction,
  type Request,
  type Response,
} from 'express'

export const tryCatch = (asyncFunction: any) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('LOG FROM TC')

    asyncFunction(req, res, next).catch(next)
  }
}

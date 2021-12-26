import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize from 'sequelize'
import { findAllPackageType } from '../services/find/package.type'

export const findAllPackageTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllPackageType({})
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

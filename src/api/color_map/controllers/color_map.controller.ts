import sequelize from 'sequelize'
import createError from 'http-errors'
import { Response, Request, NextFunction } from 'express'
import { findAllRoles } from '../services/find'

export const findAllQuestionTypeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await findAllRoles()
    res.status(200).json(roles)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

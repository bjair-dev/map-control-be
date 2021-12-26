import sequelize from 'sequelize'
import createError from 'http-errors'
import { Response, Request, NextFunction } from 'express'
import { createEntryType } from '../services/create/index'
import { EntryTypeAttributes } from '../models/entry.type.model'
import { findAllEntryType } from '../services/find/index'
import { IToken } from '../../auth/passport/passport'

export const createEntryTypeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { type } = req.body as EntryTypeAttributes
    const entryType: EntryTypeAttributes = await createEntryType({
      created_by:Number(user.userId),
      type
    })
    res.status(200).json(entryType)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const findAllEntryTypeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
  
    const types: EntryTypeAttributes[] = await findAllEntryType()
    res.status(200).json(types)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

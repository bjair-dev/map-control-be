import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
// import { IToken } from '../../auth/passport/passport'
import { findAllLoanType } from '../services/find/loan.type'
import { IToken } from '../../auth/passport/passport'
import { createLoanType } from '../services/create/loan.type'


export const findAllLoanTypeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loantype =  await findAllLoanType({
      attributes: ['id', 'type'],
    })
    res.status(200).json(loantype)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}



export const addLoanTypeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { type } = req.body

    const loanType = await createLoanType({
        loanType:{
            created_by:user.userId,
            type
        }
    })

    res.status(200).json(loanType)
    
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

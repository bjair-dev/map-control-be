
import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
import { findAllLoanBank } from '../services/find/loan.bank'
import { findOneLoanType } from '../services/find/loan.type'


export const findAllLoanBankController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      
      const loanType = await findOneLoanType({where:{id}})
      const loanBanks = await findAllLoanBank({
        where: {
            loan_type_id:Number(id)
        },
        attributes:{
            exclude:['updated','created_by','updated_by','loan_type_id','bankId']
        },
        order:[['tea',loanType?.order as string]]
        // attributes: ['id','description','url','tea','state','loan_type_id','bankId','title','requirement','created','updated'],
      })
      
      const result = {
          loan_type_id:loanType?.id,
          type:loanType?.type,
          data:loanBanks
      }
      
      res.status(200).json(result)
    } catch (err: any) {
      if (err instanceof sequelize.ValidationError) next(createError(400, err))
  
      next(createError(404, err))
    }
  }
  
import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
import { createLoan } from '../services/create/loan'
import { IToken } from '../../auth/passport/passport'
import { deleteLoan } from '../services/delete/loan'
import { findOneLoan, SearchLoan } from '../services/find/loan'
import { updateLoan } from '../services/update/loan'
import { findAllLoan } from '../services/find/loan'

export const SeachLoanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const { q } = req.params
    
    const regex = q.split(" ").join("|")
    
    const list = await SearchLoan({
      regex,
      order: [['id', 'DESC']],
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const addLoanController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { state = 1 } = req.query
    const { description, tea, url="" ,bankId ,loan_type_id ,title, requirement } = req.body
    
    const loan = await createLoan({
        loan:{
            created_by:user.userId,
            description,
            requirement,
            tea,
            title,
            url,
            bankId,
            loan_type_id,
            state:Number(state)
        }
    })
    
    res.status(200).json(loan)
    
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const findAllLoanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {state = 1, page = 1} = req.query
    const listLoan = await findAllLoan({
      state: Number(state),
      page: Number(page),
    })
    console.log(listLoan)
    res.status(200).json(listLoan)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}


export const findOneLoanController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const Loan = await findOneLoan({
      where: {
        id,
      },
      attributes: ['id','description','url','tea','state','loan_type_id','bankId','title','requirement','created','updated'],
    })
    res.status(200).json(Loan)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const removeLoanController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    await deleteLoan({
        where:{
            id
        }
    })
    res.status(200).json('!Se elimino con exito¡')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const updateLoanController = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IToken
  
  // const state : undefined | Number  = req.query.state
  const { description, tea, url,bankId ,loan_type_id , title , requirement} = req.body
  try {
    await updateLoan({
     loan:{
        updated_by:user.userId,
        description,
        tea:parseFloat(tea),
        title,
        url,
        requirement,
        bankId,
        loan_type_id,
        state:req.query?.state?Number(req.query.state):undefined
     },
      where: {
        id:Number(req.params.id),
      },
    })
   
    res.status(200).json('¡Se actualizo correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

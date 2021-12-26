import { Request,Response,NextFunction } from 'express'
import createError from 'http-errors'
import sequelize from 'sequelize'
import { IToken } from '../../auth/passport/passport'
import { MotivationalPhraseAttributes } from '../models/motivational.phrase'
import { createMotivationalPhraseAdmin } from '../services/create/motivational.phrase'
import { deleteMotivationalPhrase } from '../services/delete/motivational.phrase'
import { findAllMotivationalPhrase, findLatestMotivationalPhrase, findMotivationalPhraseById } from '../services/find/motivational.phrase'
import { updateMotivationalPhrase } from '../services/update/motivational.phrase'

export const findLatestMotivationalPhraseController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const MotivationalPhrase = await findLatestMotivationalPhrase({
        attributes:['id','phrase'],
        order:[['created','DESC']],
        limit:1,
        where:{
            state:true
        }
    })
    
      res.status(200).json(MotivationalPhrase)
    } catch (err: any) {
      if (err instanceof sequelize.ValidationError) next(createError(400, err))
  
      next(createError(404, err))
    }
  }

  export const listMotivationalPhraseAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const MotivationalPhrase = await findAllMotivationalPhrase({
        attributes:['id','phrase','state']
    })
    
      res.status(200).json(MotivationalPhrase)
    } catch (err: any) {
      if (err instanceof sequelize.ValidationError) next(createError(400, err))
  
      next(createError(404, err))
    }
  }
  
  export const addMotivationalPhraseAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.user as IToken
      const phrase:string = req.body.phrase
      const MotivationalPhrase = await createMotivationalPhraseAdmin({
       created_by:userId,
       phrase
    })
      res.status(200).json(MotivationalPhrase)
    } catch (err: any) {
      if (err instanceof sequelize.ValidationError) next(createError(400, err))
  
      next(createError(404, err))
    }
  }
  
  export const deleteMotivationalPhraseController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id:number = Number(req.params.id)
      await deleteMotivationalPhrase({
       id
    })
      res.status(200).json('Se eliminó correctamente')
    } catch (err: any) {
      if (err instanceof sequelize.ValidationError) next(createError(400, err))
  
      next(createError(404, err))
    }
  }
  
  export const updateMotivationalPhraseController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.user as IToken
      const { phrase,state } = req.body as MotivationalPhraseAttributes 
      const id:number = Number(req.params.id)
      await updateMotivationalPhrase({
       motivationalPhrase:{
           phrase,
           state,
           updated_by:userId
       },
       where:{
           id
       }
    })
      res.status(200).json('Se actualizó correctamente')
    } catch (err: any) {
      if (err instanceof sequelize.ValidationError) next(createError(400, err))
  
      next(createError(404, err))
    }
  }
  
  //findMotivationalPhraseById
  export const findMotivationalPhraseByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id:number = Number(req.params.id)
      const MotivationalPhrase = await findMotivationalPhraseById({
        attributes:['id','phrase','state'],
        id
    })
    
      res.status(200).json(MotivationalPhrase)
    } catch (err: any) {
      if (err instanceof sequelize.ValidationError) next(createError(400, err))
  
      next(createError(404, err))
    }
  }

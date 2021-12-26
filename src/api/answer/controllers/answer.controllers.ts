import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
import { IToken } from '../../auth/passport/passport'

import {createAnswer} from '../services/create/answer'
export const addAnswerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { questionId, answered } = req.body
    const { question21 } = req.query
    
    if(question21 && question21 == "ok"){
      const answer = await createAnswer({
        answer:{
            questionId,
            answered,
            state:true,
            userId:user.userId,
            question21:true
        }
    })
    return res.status(200).json(answer)
    }
    const answer = await createAnswer({
        answer:{
            questionId,
            answered,
            state:true,
            userId:user.userId
        }
    })
    
    return res.status(200).json(answer)
    
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

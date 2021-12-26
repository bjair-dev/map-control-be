import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
import { IToken } from '../../auth/passport/passport'

import {createAnswerSurvey} from '../services/create/answer.survey'
export const addAnswerSurveyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { surveyId, answer } = req.body
    
    const answerSurvey = await createAnswerSurvey({
        answer_survey:{
            surveyId,
            answer,
            state:true,
            userId:user.userId
        }
    })
    
    return res.status(200).json(answerSurvey)
    
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

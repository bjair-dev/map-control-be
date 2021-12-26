import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import { createSurveyService, updateSurveyService } from '../services/survey.service'
import { IToken } from '../../auth/passport/passport'
import sequelize from 'sequelize'
import { updateSurvey } from '../services/update/survay'
import { saveImageInServer } from '../../../shared/save.file'
import { SurveyAttributes } from '../models/survay.model'
import { findAllSurvey, findOneSurvey } from '../services/find/survey'
import { deleteSurvey } from '../services/delete/survey'
import { DataBase } from '../../../database'

export const createSurveyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { title, image, description, question, survey_type_id, contents } = req.body
    const listQuestion = await createSurveyService({
      survey: {
        title,
        description,
        question,
        survey_type_id,
        created_by: user.userId,
      },
      contents,
      image,
    })
    res.status(200).json(listQuestion)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const findOneSurveyController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const survey = await findOneSurvey({
      where: {
        id: Number(id),
      },
      attributes:{
        exclude:['size','key','created','created_by','updated_by','updated']
      },
      include:[{
        model:DataBase.instance.surveyType,
        
      },{
      model:DataBase.instance.surveyContent,
      attributes:{
        exclude:['created','created_by','updated_by','updated']
      },
      }]
    })
    res.status(200).json(survey)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const findAllSurveyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await findAllSurvey({
      page: Number(req.query.page),
      where: {
        state: Number(req.query.state),
      },
      attributes: {
        include: ['id', 'title', 'question', 'description', 'path', 'size', 'key', 'created', 'updated'],
        exclude: ['crated_by', 'updated_by', 'state', 'survey_type_id'],
      },
      order: [['id', 'DESC']],
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const updateSurveyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, question, description, image, key } = req.body

    const user = req.user as IToken
    await updateSurveyService({
      survey: {
        title,
        question,
        description,
        updated_by: user.userId,
        key,
        id: Number(req.params.id),
      },
      image,
    })

    res.status(200).json('Se actualizo la encuesta')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const deleteSurveyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteSurvey(Number(req.params.id))
    res.status(200).json('Se elimino la encuesta')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const archivedSurveyController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { state } = req.body
    await updateSurvey({
      survey: {
        updated_by: user.userId,
        state,
      },
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json(`Se ${state ? 'desarchivo' : 'archivo'} correctamente`)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

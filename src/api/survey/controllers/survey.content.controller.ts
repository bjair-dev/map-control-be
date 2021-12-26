import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
import { IToken } from '../../auth/passport/passport'
import { updateSurveyContent } from '../services/update/survay.content'
import { createSurveyContent } from '../services/create/survey.content'
import { deleteSurveyContent } from '../services/delete/survay.content'

export const updateSurveyContentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content } = req.body
    const user = req.user as IToken

    await updateSurveyContent({
      survet_content: {
        updated_by: user.userId,
        content,
      },
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json('Se actualizo exitosamente')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const createSurveyContentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, surveyId } = req.body
    const user = req.user as IToken

    const _content = await createSurveyContent({
      survey_content: {
        content,
        created_by: user.userId,
        surveyId,
      },
    })
    res.status(200).json(_content)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const deleteSurveyContentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteSurveyContent(Number(req.params.id))
    res.status(200).json('Se elimino la alternativa')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

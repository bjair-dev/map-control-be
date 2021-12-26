import sequelize from 'sequelize'
import createError from 'http-errors'
import { findAllQuestion, findOneQuestion } from '../services/find/question'
import { NextFunction, Request, Response } from 'express'
import { createQuestion } from '../services/create'
import { IToken } from '../../auth/passport/passport'
import { updateQuestion } from '../services/update'
import { deleteQuestion } from '../services/delete'

import { saveImageInServer } from '../../../shared/save.file'
import { findOneGlobalVar } from '../../global/services/find/global'
import { updateImageQuestion } from '../services/question.service'

import config from '../../../config/environments'

export const ListOneQuestionController = async (req: Request, res: Response, next: NextFunction) => {
  const { questionId } = req.params
  const user = req.user as IToken

  try {
    const question = await findOneQuestion({
      id: Number(questionId),
    })
    res.status(200).json(question)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const findAllQuestionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const state = req.query.state as string
    const listQuestion = await findAllQuestion({
      state: Number(state),
      page: Number(req.query.page),
    })
    res.status(200).json(listQuestion)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const createQuestionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { question, question_type_id, motivation, tip, question_category_id } = req.body
    const image: Buffer | undefined = req.body.image
    let _key: string | undefined = undefined
    let _path: string | undefined = undefined
    let _size: string | undefined = undefined
    if (image) {
      const { key, path, size } = await saveImageInServer({ buffer: image! })
      _key = key
      _path = config.PROY_BEURL + '/api/render-image/' + key
      _size = size
    } else {
      _path = (await findOneGlobalVar('question_image_default'))?.value
    }

    const _question = await createQuestion({
      adminId: user.userId,
      question,
      question_type_id,
      motivation,
      tip,
      key: _key,
      path: _path,
      size: _size,
      question_category_id,
    })
    res.status(200).json(_question)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const updateQuestionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { question_category_id, tip, question, motivation } = req.body
    const questionId = Number(req.params.questionId)
    await updateQuestion({
      motivation,
      question,
      questionId,
      tip,
      adminId: user.userId,
      question_category_id,
    })
    res.status(200).json('¡Se actualizo correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
//*@DESC  update image of the question
export const updateImageQuestionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const result = await updateImageQuestion({
      image: req.body.image as Buffer,
      questionId: Number(req.params.questionId),
      adminId: user.userId,
    })
    res.status(200).json(result)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const archivedQuestionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    await updateQuestion({
      questionId: Number(req.params.questionId),
      state: req.body.state,
      adminId: user.userId,
    })
    res.status(200).json('¡Se archivo correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const deleteQuestionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteQuestion(Number(req.params.questionId))
    res.status(200).json('¡Se elimino correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

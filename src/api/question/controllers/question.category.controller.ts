import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize from 'sequelize'
import { createQuestionCategory } from '../services/create/question.category'
import { IToken } from '../../auth/passport/passport'
import { findAllQuestionCategories } from '../services/find/question.category'
import { updateCategory } from '../services/update/question.category'
import { deleteQuestionCategory } from '../services/delete/question.category'

export const createQuestionCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const category = await createQuestionCategory({
      question_category: {
        category: req.body.category,
        created_by: user.userId,
      },
    })
    res.status(200).json(category)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const findAllQuestionCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list_categories = await findAllQuestionCategories({
      order: [['id', 'ASC']],
      attributes: {
        include: ['id', 'category', 'created', 'updated'],
        exclude: ['created_by', 'updated_by'],
      },
    })
    res.status(200).json(list_categories)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const updateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateCategory({
      question_category: {
        category: req.body.category,
      },
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json('!Se actualizo la categoria¡')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const deleteQuestionCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteQuestionCategory({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json('!Se elimino con exito¡')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

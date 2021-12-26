import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize from 'sequelize'
import { IToken } from '../../auth/passport/passport'
import { createVideoCategory } from '../services/create/videos.category'
import { deleteVideoCategory } from '../services/delete/videos.category'
import { findAllVideoCategories } from '../services/find/videos.category'
import { updateVideoCategory } from '../services/update/videos.category'

export const createVideoCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const category = await createVideoCategory({
      video_category: {
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
export const findAllVideoCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list_categories = await findAllVideoCategories({
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
export const updateVideoCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateVideoCategory({
      video_category: {
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
export const deleteVideoCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteVideoCategory({
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

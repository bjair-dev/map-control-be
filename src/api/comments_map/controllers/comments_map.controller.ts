import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
/* import { createCommentsService } from '../services/comments_map.service' */
import { IToken } from '../../auth/passport/passport'
import { CommentsAttributes } from '../models/comments_map.model'
import { findAllComments, SearchComments } from '../services/find'
import { updateTip } from '../services/update/index'
import { deleteOneTip } from '../services/delete'



export const SeachCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const { q } = req.params
    
    const regex = q.split(" ").join("|")
    
    const list = await SearchComments({
      regex,
      order: [['id', 'DESC']],
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}



/* export const createCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const { tip, motivation, title, tip_category_id } = req.body

    const image = req.body.image as Buffer

    const _tip = await createCommentsService({
      adminId: user.userId,
      image,
      tip: {
        tip,
        motivation,
        title,
        tip_category_id,
      },
    })
    res.status(200).json(_tip)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
} */
export const findAllCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await findAllComments()
    res.status(200).json(comments)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
/* export const updateTipController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const { motivation, tip, title, tip_category_id } = req.body
    await updateTip({
      id: Number(req.params.tipId),
      motivation,
      tip,
      title,
      adminId: user.userId,
      tip_category_id,
    })
    res.status(200).json('¡Se actualizo correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const updateImageTipServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken

    const results = await updateImageTipService({
      image: req.body.image as Buffer,
      tipId: Number(req.params.tipId),
      adminId: user.userId,
    })
    res.status(200).json(results)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
//*DESC Archived or Unarchived the tips
export const archivedTipController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken

    await updateTip({
      id: Number(req.params.tipId),
      state: req.body.state,
      adminId: user.userId,
    })
    res.status(200).json('¡Se ejecuto correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
} */
export const deleteOneCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteOneTip(Number(req.params.commentsId))
    res.status(200).json('¡Se elimino correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
import { createNoticiaService, updateImageTipService } from '../services/noticia.service'
import { IToken } from '../../auth/passport/passport'
import { NoticiaAttributes } from '../models/noticia.model'
import { findAllNoticia, SearchTip } from '../services/find'
import { updateTip } from '../services/update/index'
import { deleteOneTip } from '../services/delete'

export const SeachTipsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.params

    const regex = q.split(' ').join('|')

    const list = await SearchTip({
      regex,
      order: [['id', 'DESC']],
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const createTipController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { titular, title } = req.body

    const image = req.body.image as Buffer

    const _noticia = await createNoticiaService({
      adminId: user.userId,
      image,
      noticia: {
        titular,
        title,
      },
    })
    res.status(200).json(_noticia)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const findAllNoticiaController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noticia = await findAllNoticia({
      page: Number(req.query.page),
      where: {
        state: Number(req.query.state),
      },
      attributes: {
        include: ['id', 'title', 'titular', 'created', 'updated', 'path', 'key', 'size'],
        exclude: ['updated_by', 'created_by', 'state'],
      },
    })
    res.status(200).json(noticia)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
/* 
export const findAllNoticiaController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roles = await findAllNoticia()
    res.status(200).json(roles)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
} */

export const updateTipController = async (req: Request, res: Response, next: NextFunction) => {
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
export const updateImageTipServiceController = async (req: Request, res: Response, next: NextFunction) => {
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
export const archivedTipController = async (req: Request, res: Response, next: NextFunction) => {
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
}
export const deleteOneTipController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteOneTip(Number(req.params.tipId))
    res.status(200).json('¡Se elimino correctamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize from 'sequelize'
import { createVideoService, updateVideoService } from '../services/video.service'
import { IToken } from '../../auth/passport/passport'
import { findAllVideos } from '../services/find/index'
import { deleteVideo } from '../services/delete'
import { updateVideo } from '../services/update/index'

export const createVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const video = await createVideoService({
      adminId: user.userId,
      image: req.body.image as Buffer,
      video: req.body,
      vimeo: req.body.vimeo as Buffer,
    })
    res.status(200).json(video)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const findAllVideosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const videos = await findAllVideos({
      page: Number(req.query.page),
      where: {
        state: Number(req.query.state),
      },
      attributes: {
        exclude: ['created_by', 'updated_by', 'state', 'video_category_id'],
      },
    })
    res.status(200).json(videos)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const deleteVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteVideo(Number(req.params.id))
    res.status(200).json('¡Se elimino satisfactoriamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const archivedVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const state = req.body.state as number

    await updateVideo({
      video: {
        state,
      },
      adminId: Number(user.userId),
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json('¡Se archivo satisfactoriamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const updateVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken

    await updateVideoService({
      adminId: user.userId,
      image: req.body.image,
      video: {
        id: Number(req.params.id),
        key: req.body.key,
        title: req.body.title,
        description: req.body.description,
        video_category_id: req.body.video_category_id,
      },
    })

    res.status(200).json('¡Se actualizo satisfactoriamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

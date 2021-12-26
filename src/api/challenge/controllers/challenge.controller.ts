import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize from 'sequelize'
import { findAllChallenge } from '../services/find'
import { createChallenge } from '../services/created/index'
import { IToken } from '../../auth/passport/passport'
import {
  createChallengeService,
  deleteChallengeService,
  updateChallengeService,
} from '../services/challenge.service'
import { updateChallenge } from '../services/update/index'

export const findAllChallengeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const challenges = await findAllChallenge({
      page: Number(req.query.page),
      where: {
        state: Number(req.query.state),
      },
    })
    res.status(200).json(challenges)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const createChallengeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken

    const challenge = await createChallengeService({
      challenge: req.body,
      adminId: user.userId,
      image: req.body.image as Buffer,
    })
    res.status(200).json(challenge)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const archivedChallengeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const state = req.body.state
    await updateChallenge({
      where: {
        id: Number(req.params.id),
      },
      challenge: {
        updated_by: user.userId,
        state,
      },
    })
    res.status(200).json(`Se ${state ? 'desarchivo' : 'archivo'} exitosamente`)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const deleteChallengeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteChallengeService(Number(req.params.id))

    res.status(200).json('Se elimino satisfactoriamente')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const updateChallengeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken

    await updateChallengeService({
      challenge: {
        updated_by: user.userId,
        id: Number(req.params.id),
        ...req.body,
      },
      image: req.body.image,
    })

    res.status(200).json('Se actualizo satisfactoriamente')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

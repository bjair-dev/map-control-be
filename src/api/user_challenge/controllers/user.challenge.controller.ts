import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
import {
  createUserChallengeService,
  updateAceptadoChallengeService,
  updateCompleadoChallengeService,
  findUserChallengeByUserIdAndChallengeIdService,
  findAllMedals,
} from '../services/user.challenge.service'
import { IToken } from '../../auth/passport/passport'

export const createUserChallengeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const _uchallenge = await createUserChallengeService({
      userId: user.userId,
      challengeId: +req.params.challengeId,
    })
    res.status(200).json(_uchallenge)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const updateAceptadoChallengeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log('####', req.params.challengeId)
    const user = req.user as IToken
    let useri = +user.userId
    let challengeId = +req.params.challengeId
    const user_challenge = await findUserChallengeByUserIdAndChallengeIdService({
      userId: useri,
      challengeId: challengeId,
    })
    // console.log('####', user_challenge[0].toJSON())
    let challenge = user_challenge[0].toJSON() as any

    const _updateChallenge = await updateAceptadoChallengeService({
      id: challenge.id,
    })
    res.status(200).json(_updateChallenge)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const updateCompletadoChallengeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    let useri = +user.userId
    let challengeId = +req.params.challengeId
    const user_challenge = await findUserChallengeByUserIdAndChallengeIdService({
      userId: useri,
      challengeId: challengeId,
    })
    // console.log('####', user_challenge[0].toJSON())
    let challenge = user_challenge[0].toJSON() as any
    const _updateChallenge = await updateCompleadoChallengeService({
      id: challenge.id,
    })
    res.status(200).json(_updateChallenge)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const findMedalsUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const user_medals = await findAllMedals(user.userId)
    // console.log('####', user_medals.count)
    res.status(200).json(user_medals.count)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize, { Op } from 'sequelize'
import {
  findAllPackage,
  listOfChallengeToUse,
  listOfQuestionToUse,
  listOfTipToUse,
  listOfVideoToUse,
} from '../services/find/package'
import { createPackage } from '../services/create/package'
import { IToken } from '../../auth/passport/passport'
import { deletePackage } from '../services/delete/package'
import { findOnePackage } from '../services/find/package'

export const findAllPackageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await findAllPackage({
      package_header_id: Number(req.query.package_header_id),
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const listOfTipToUseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await listOfTipToUse({
      package_header_id: Number(req.query.package_header_id),
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const listOfVideoToUseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await listOfVideoToUse({
      package_header_id: Number(req.query.package_header_id),
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const listOfQuestionToUseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await listOfQuestionToUse({
      package_header_id: Number(req.query.package_header_id),
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const listOfChallengeToUseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const list = await listOfChallengeToUse({
      package_header_id: Number(req.query.package_header_id),
    })
    res.status(200).json(list)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const deletePackageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deletePackage({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json('Se elimino satisfactoriamente')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}
export const createPackageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const {
      challengeId,
      questionId,
      tipId,
      videoId,
      package_content_type_id,
      package_header_Id,
    } = req.body

    if (req.body.package_content_type_id == 1) {
      if (!req.body.questionId)
        return res.status(400).json({
          msg: 'No se ingreso un contenido tipo pregunta',
        })

      const obj = await findOnePackage({
        where: {
          [Op.and]: {
            package_header_Id,
            questionId,
          },
        },
      })

      if (obj)
        return res.status(400).json({
          msg: 'Ya existe la pregunta seleccionada en la programación',
        })
    } else if (req.body.package_content_type_id == 2) {
      if (!req.body.videoId)
        return res.status(400).json({
          msg: 'No se ingreso un contenido tipo video',
        })
      const obj = await findOnePackage({
        where: {
          [Op.and]: {
            package_header_Id,
            videoId,
          },
        },
      })

      if (obj)
        return res.status(400).json({
          msg: 'Ya existe el video seleccionado en la programación',
        })
    } else if (req.body.package_content_type_id == 3) {
      if (!req.body.tipId)
        return res.status(400).json({
          msg: 'No se ingreso un contenido tipo tip',
        })
      const obj = await findOnePackage({
        where: {
          [Op.and]: {
            package_header_Id,
            tipId,
          },
        },
      })

      if (obj)
        return res.status(400).json({
          msg: 'Ya existe el tip seleccionado en la programación',
        })
    } else if (req.body.package_content_type_id == 4) {
      if (!req.body.challengeId)
        return res.status(400).json({
          msg: 'No se ingreso un contenido tipo desafío',
        })
      const obj = await findOnePackage({
        where: {
          [Op.and]: {
            package_header_Id,
            challengeId,
          },
        },
      })

      if (obj)
        return res.status(400).json({
          msg: 'Ya existe el desafío seleccionado en la programación',
        })
    } else {
      return res.status(400).json({ msg: 'package_content_type_id no encontrado' })
    }
    const _package = await createPackage({
      adminId: user.userId,
      _package: {
        challengeId,
        questionId,
        tipId,
        videoId,
        package_content_type_id,
        package_header_Id,
      },
    })
    return res.status(200).json(_package)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

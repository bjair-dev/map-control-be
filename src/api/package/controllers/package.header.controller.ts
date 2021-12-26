import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import sequelize from 'sequelize'
import { IToken } from '../../auth/passport/passport'
import { createPackageHeader } from '../services/create/package.header'
import { findAllPackageHeader } from '../services/find/package.header'
import { deletePackageHeader } from '../services/delete/package.header'
import moment from 'moment'
import { titleCase } from 'title-case'
moment.locale('es')
export const createPackageHeaderNumberController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IToken
    const { date, name, outstanding } = req.body
    const _package = await createPackageHeader({
      package_header: {
        created_by: user.userId,
        date,
        name: 'Día ' + date + ': ' + name,
        package_type_id: 1,
        outstanding,
      },
    })
    res.status(200).json(_package)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}
export const createPackageHeaderDateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, name, outstanding } = req.body

    const date_custom = titleCase(moment(date).format('dddd D MMMM YYYY')).split(' ')
    const date_name = `${date_custom[0]} ${date_custom[1]} de ${date_custom[2]} del ${date_custom[3]}`
    const user = req.user as IToken
    const _package = await createPackageHeader({
      package_header: {
        created_by: user.userId,
        package_type_id: 2,
        date: moment(date).toDate().toString(),
        name: date_name + ': ' + name,
        outstanding,
      },
    })
    res.status(200).json(_package)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}
export const findAllPackageHeaderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const type = Number(req.query.type)
    const list = await findAllPackageHeader({
      where: {
        '$package_type.id$': type,
      },
      page: Number(req.query.page),
    })
    res.status(200).json({ type, ...list })
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}
export const deletePackageHeaderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deletePackageHeader(Number(req.params.id))
    res.status(200).json('¡Se elimino satisfactoriamente!')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

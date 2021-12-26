import { NextFunction, Request, Response } from 'express'
import sequelize from 'sequelize'
import createError from 'http-errors'
import { IToken } from '../../auth/passport/passport'
import { createLoanLink } from '../services/create/loan.link'
import { findOneLoanLink, findAllLoanLink } from '../services/find/loan.link'
import { createLoanLinkContent } from '../services/create/loan.link.content'
import { findAllbyLoanLinkId } from '../services/find/loan.link.content'
import { findOneLoan } from '../services/find/loan'
import moment from 'moment'
import { deleteLoanLink, deleteLoanLinkContent } from '../services/delete/loan.link'

export const addLoanLinkController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IToken
    const { state = 1 } = req.query
    const { link_ref, title, description } = req.body
    const arr_loan: Array<number> = req.body.arr_loan
    const loanLink = await createLoanLink({
      loanLink: { created_by: user.userId, link_ref, title, description, state: Number(state) },
    })

    const re = loanLink.toJSON() as any
    for (let i = 0; i < arr_loan.length; i++) {
      let loanLinkContent = await createLoanLinkContent({
        loanLinkContent: {
          id_loan_link: re.id,
          id_loan: arr_loan[i],
          state: 1,
        },
      })
    }

    res.status(200).json(loanLink)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const findAllLoanLinkController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loanlinks = await findAllLoanLink({ state: 1 })
    res.status(200).json(loanlinks)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const findOneLoanLinkController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const loanLink = await findOneLoanLink({
      where: {
        id,
      },
      attributes: ['id', 'title', 'description', 'link_ref', 'created'],
    })
    const loanLinkContents = await findAllbyLoanLinkId(+id)
    res.status(200).json({ loanLink, loanLinkContents })
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const removeLoanLinkController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    await deleteLoanLinkContent(id)
    await deleteLoanLink({ where: { id } })
    res.status(200).json('!Se elimino con exito¡')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

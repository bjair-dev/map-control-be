import { DataBase } from '../../../../database'
import { LoanLinkAttributes } from '../../models/loan.link.model'

import { WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'

export const findAllLoanLink = async ({ state }: { state: number }) => {
  try {
    const rows = await DataBase.instance.loanLink.findAll({
      where: {
        state,
      },
      attributes: ['id', 'title'],
      include: [
        {
          model: DataBase.instance.loanLinkContent,
          attributes: ['id_loan'],
          required: true,
        },
      ],
    })
    return rows
  } catch (error) {
    throw error
  }
}

export const findOneLoanLink = async ({
  where,
  attributes,
}: {
  where: WhereOptions<LoanLinkAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const loanLink = await DataBase.instance.loanLink.findOne({
      where,
      attributes,
    })
    if (loanLink) return loanLink.get({ plain: true })
    return loanLink
  } catch (err) {
    throw err
  }
}

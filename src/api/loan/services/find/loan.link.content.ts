import { DataBase } from '../../../../database'
import { LoanLinkContentAttributes } from '../../models/loan.link.content.model'

import { WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'

export const findAllbyLoanLinkId = async (id: number) => {
  try {
    const loanLink = await DataBase.instance.loanLinkContent.findAll({
      where: {
        id_loan_link: id,
      },
      include: [
        {
          model: DataBase.instance.loan,
          as: 'loan',
          required: true,
          attributes: ['id', 'bankId', 'title', 'requirement', 'tea', 'description', 'url'],
          include: [
            {
              model: DataBase.instance.loanType,
              as: 'loan_type',
              required: true,
              attributes: ['id', 'type'],
            },
            {
              model: DataBase.instance.bank,
              as: 'bank',
              required: true,
              attributes: ['id', 'name', 'num_whatsapp', 'num_atc'],
            },
          ],
        },
      ],
    })

    return loanLink
  } catch (err) {
    throw err
  }
}

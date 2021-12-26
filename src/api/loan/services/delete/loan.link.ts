import { DataBase } from '../../../../database'
import { LoanLinkAttributes } from '../../models/loan.link.model'
import { WhereOptions } from 'sequelize'

export const deleteLoanLink = async ({ where }: { where: WhereOptions<LoanLinkAttributes> }) => {
  try {
    return await DataBase.instance.loanLink.destroy({
      where,
    })
  } catch (err) {
    throw err
  }
}

export const deleteLoanLinkContent = async (id: number) => {
  try {
    return await DataBase.instance.loanLinkContent.destroy({
      where: {
        id_loan_link: id,
      },
    })
  } catch (error) {
    throw error
  }
}

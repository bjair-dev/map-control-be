import { DataBase } from '../../../../database'
import moment from 'moment'
import { LoanLinkAttributes } from '../../models/loan.link.model'

export const createLoanLink = async ({ loanLink }: { loanLink: LoanLinkAttributes }) => {
  try {
    return await DataBase.instance.loanLink.create({
      created: moment().toDate(),
      ...loanLink,
    })
  } catch (err) {
    throw err
  }
}

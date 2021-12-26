import { DataBase } from '../../../../database'
import moment from 'moment'
import { LoanLinkContentAttributes } from '../../models/loan.link.content.model'

export const createLoanLinkContent = async ({
  loanLinkContent,
}: {
  loanLinkContent: LoanLinkContentAttributes
}) => {
  try {
    return await DataBase.instance.loanLinkContent.create({
      created: moment().toDate(),
      ...loanLinkContent,
    })
  } catch (err) {
    throw err
  }
}

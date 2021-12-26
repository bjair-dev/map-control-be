import { DataBase } from '../../../../database'
import moment from 'moment'
import { LoanTypeAttributes } from '../../models/loan.type.model'

export const createLoanType = async ({ loanType }: { loanType: LoanTypeAttributes }) => {
  try {
    return await DataBase.instance.loanType.create({
      created: moment().toDate(),
      ...loanType,
    })
  } catch (err) {
    throw err
  }
}

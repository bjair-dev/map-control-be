import { DataBase } from '../../../../database'
import moment from 'moment'
import { LoanAttributes } from '../../models/loan.model'

export const createLoan = async ({ loan }: { loan: LoanAttributes }) => {
  try {
    return await DataBase.instance.loan.create({
      created: moment().toDate(),
      ...loan,
    })
  } catch (err) {
    throw err
  }
}

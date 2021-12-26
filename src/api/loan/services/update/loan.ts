import { DataBase } from '../../../../database'
import moment from 'moment'
import { LoanAttributes } from '../../models/loan.model'
import { WhereOptions } from 'sequelize'

export const updateLoan = async ({
  loan,
  where,
}: {
  loan: LoanAttributes
  where: WhereOptions<LoanAttributes>
}) => {
  try {
    return await DataBase.instance.loan.update(
      {
        updated: moment.utc().toDate(),
        ...loan,
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}

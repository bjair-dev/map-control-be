import { DataBase } from '../../../../database'
import { LoanAttributes } from '../../models/loan.model'
import { WhereOptions } from 'sequelize'

export const deleteLoan = async ({
  where,
}: {
  where: WhereOptions<LoanAttributes>
}) => {
  try {
    return await DataBase.instance.loan.destroy({
      where,
    })
  } catch (err) {
    throw err
  }
}

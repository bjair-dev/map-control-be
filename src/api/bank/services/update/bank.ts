import { DataBase } from '../../../../database'
import moment from 'moment'
import { BankAttributes } from '../../models/bank.model'
import { WhereOptions } from 'sequelize'

export const updateBank = async ({
  bank,
  where,
}: {
  bank: BankAttributes
  where: WhereOptions<BankAttributes>
}) => {
  try {
    return await DataBase.instance.bank.update(
      {
        updated: moment.utc().toDate(),
        ...bank,
      },
      {
        where,
      }
    )
  } catch (err) {
    throw err
  }
}

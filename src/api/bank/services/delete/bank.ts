import { DataBase } from '../../../../database'
import { BankAttributes } from '../../models/bank.model'
import { WhereOptions } from 'sequelize'

export const deleteBank = async ({
  where,
}: {
  where: WhereOptions<BankAttributes>
}) => {
  try {
    return await DataBase.instance.bank.destroy({
      where,
    })
  } catch (err) {
    throw err
  }
}

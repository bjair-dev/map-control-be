import { DataBase } from '../../../../database'
import { BankAttributes } from '../../models/bank.model'
import { WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'

export const findOneBank = async ({
  where,
  attributes,
}: {
  where: WhereOptions<BankAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    const bank = await DataBase.instance.bank.findOne({
      where,
      attributes,
    })
    if (bank) return bank.get({ plain: true })
    return bank
  } catch (err) {
    throw err
  }
}

export const findAllBank = async ({
  where,
  attributes,
}: {
  where?: WhereOptions<BankAttributes>
  attributes?: FindAttributeOptions
}) => {
  try {
    return await DataBase.instance.bank.findAll({
      where,
      attributes,
      order: [['id', 'DESC']],
    })
  } catch (err) {
    throw err
  }
}

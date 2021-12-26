import { DataBase } from '../../../../database'
import moment from 'moment'
import { BankAttributes } from '../../models/bank.model'

export const createBank = async ( bank: BankAttributes ) => {
  try {
    return await DataBase.instance.bank.create({
      created: moment().toDate(),
      ...bank,
    })
  } catch (err) {
    throw err
  }
}

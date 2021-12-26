import { DataBase } from '../../../../database'
import moment from 'moment'
import { TeaUsdAttributes } from '../../models/tea.usd.model'

export const createTenUsd = async ({ tea_usd }: { tea_usd: TeaUsdAttributes }) => {
  try {
    return await DataBase.instance.teaUsd.create({
      created: moment().toDate(),
      ...tea_usd,
    })
  } catch (err) {
    throw err
  }
}
